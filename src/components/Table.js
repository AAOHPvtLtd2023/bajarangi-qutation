import React, { useState } from "react";
import "./Table.css";

const Table = ({ items, setItems, searchQuery, openEditModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Delete functionality with alert confirmation
  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${item.product}?`
    );
    if (confirmDelete) {
      const filteredItems = items.filter((i) => i.id !== item.id);
      setItems(filteredItems);
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <colgroup>
          <col style={{ backgroundColor: "#f8f8f8" }} />
          <col span="2" style={{ backgroundColor: "#f0f0f0" }} />
          <col style={{ backgroundColor: "#f8f8f8" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Model No</th>
            <th>HSN Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.productName.slice(0,20)}</td>
              <td>₹ {item.rate}</td>
              <td>{item.modelNo}</td>
              <td>{item.hsncode}</td>
              <td>
                <button className="btn-edit" onClick={() => openEditModal(item)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item)}
                  disabled = {true}
                  
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              <div className="pagination-container">
                <button
                  className="btn-page"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn-page"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
