import React, { useEffect, useState } from "react";
import { fetchProducts } from "../data";
import Table from "../components/Table";
import './ProductTable.css';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../firebase_config";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    hsncode: "",
    modelNo: "",
    rate: "",
    description: [],
  });
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
    };
    fetchAllProducts();
  }, [])

  // Handle input change in the Create New modal
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        description: value.split("\n"), // Split textarea content by newline into an array
      }));
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  // Handle pressing Enter for description
  const handleDescriptionKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newDescription = e.target.value.trim();
      if (newDescription) {
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          description: [...prevDetails.description, newDescription], // Add the new line to the description array
        }));
      }
    }
  };

  // Handle creating a new product
  const handleCreateNewProduct = async () => {
    const id = uuidv4();
    await setDoc(doc(db, "Products", id), productDetails);
    alert("success");
    const newProductWithId = { ...productDetails, id: id };
    setProducts([...products, newProductWithId]);
    setProductDetails({
      productName: "",
      hsncode: "",
      modelNo: "",
      rate: "",
      description: [],
    });
    setIsCreateModalOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Open edit modal and set item to edit
  const openEditModal = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  // Handle edit item changes
  const handleEditItemChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setEditItem((prevItem) => ({
        ...prevItem,
        description: value.split("\n"), // Split textarea content by newline into an array
      }));
    } else {
      setEditItem({ ...editItem, [name]: value });
    }
  };

  // Save edited item
  const handleSaveEdit = async () => {
    const updatedItems = products.map((item) =>
      item.id === editItem.id ? editItem : item
    );
    await updateDoc(doc(db, "Products", editItem.id), editItem);
    setProducts(updatedItems);
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="product_container">
      <div className="square">
        <h2 className="logo">Products</h2>
        <div className="actions">
          <div className="toolbar">
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
            <button className="btn" onClick={() => setIsCreateModalOpen(true)}>
              <span>Create new</span>
            </button>
          </div>
        </div>
        {products &&
          <Table
            items={products}
            setItems={setProducts}
            searchQuery={searchQuery}
            openEditModal={openEditModal}
          />
        }

        {/* Create New Modal */}
        {isCreateModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Create New Product</h2>
              <div style={{display:'flex'}}>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '70%', marginRight: '2%' }}>
                <label>
                  Product Name:
                  <input
                    type="text"
                    name="productName"
                    value={productDetails.productName}
                    onChange={handleNewProductChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="text"
                    name="rate"
                    value={productDetails.rate}
                    onChange={handleNewProductChange}
                  />
                </label>
                <label>
                  Model No:
                  <input
                    type="text"
                    name="modelNo"
                    value={productDetails.modelNo}
                    onChange={handleNewProductChange}
                  />
                </label>
                <label>
                  HSN Code:
                  <input
                    type="text"
                    name="hsncode"
                    value={productDetails.hsncode}
                    onChange={handleNewProductChange}
                  />
                </label>
              </div>
              <div style={{ width: '100%' }}>

                <label>
                  Description:
                </label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Enter description and hit enter..."
                  value={productDetails.description.join("\n")} // Join array elements into a newline-separated string
                  onChange={handleNewProductChange} // Handle change as normal
                  onKeyPress={handleDescriptionKeyPress} // Detect Enter key for adding new description lines
                  className="description"
                />
              </div>
              </div>
              <div className="modal-buttons">
                <button className="btn-save"
                  onClick={handleCreateNewProduct}
                >
                  Save
                </button>
                <button
                  className="btn-close"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editItem && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Product</h2>
              <div style={{ display: 'flex', }}>

                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '70%', marginRight: '2%' }}>
                  <label>
                    Product Name:
                    <input
                      type="text"
                      name="productName"
                      value={editItem.productName}
                      onChange={handleEditItemChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="text"
                      name="rate"
                      value={editItem.rate}
                      onChange={handleEditItemChange}
                    />
                  </label>
                  <label>
                    Model No:
                    <input
                      type="text"
                      name="modelNo"
                      value={editItem.modelNo}
                      onChange={handleEditItemChange}
                    />
                  </label>
                  <label>
                    HSN Code:
                    <input
                      type="text"
                      name="hsncode"
                      value={editItem.hsncode}
                      onChange={handleEditItemChange}
                    />
                  </label>
                </div>
                <div style={{ width: '100%' }}>

                  <label>
                    Description:
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter description and hit enter..."
                    value={editItem.description.join("\n")} // Join array into a newline-separated string
                    onChange={handleEditItemChange} // Handle change for editing
                    className="description"
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button className="btn-save" onClick={handleSaveEdit}>
                  Save Changes
                </button>
                <button
                  className="btn-close"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTable;
