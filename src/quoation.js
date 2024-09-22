import React, { useEffect, useState } from "react";
import './quoation.css'
import Select from 'react-select'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './Document.js';
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from './firebase_config.js';
import numberToWords from 'number-to-words';
import { pdf } from '@react-pdf/renderer';  // Add this line to import 'pdf'
import { fetchProducts } from "./data";


function Quoationpage() {
    const storage = getStorage();
    // Customer
    const [phone, setphone] = useState(null);
    const [fullname, setfullname] = useState(null);
    const [address, setaddress] = useState(null);



    const seller = [
        { name: 'Biswajit sahoo' },
        { name: 'Gaurov Singh' },
        { name: 'Madhusmit rout' },
        { name: 'Namrata Nayak' }
    ]

    const sellerOption = seller.map((e) => ({
        label: e.name,
        value: e.name
    }))

    // Product
    const [productName, setProduct] = useState(null);
    const [Price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [selectedGst, setSelectedGst] = useState("");
    const [products, setProducts] = useState([]);
    const [allproducts, setAllProducts] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    // Price
    const [SubTotal, setSubTotal] = useState(null);
    const [Total, setTotal] = useState('');
    const [gst, setgst] = useState('');

    const [sellerName, setSellerName] = useState(null);
    const [quote, setQuote] = useState('');
    const [date, setDate] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const allProducts = await fetchProducts();
            setAllProducts(allProducts);
            const productOption = allProducts.map((product) => ({
                label: product.productName,
                value: product.id
            }));
            console.log(productOption);
            setProducts(productOption);
        };

        fetchAllProducts();


    }, [])

    useEffect(() => {
        if (productName) {
            const selectedProduct = allproducts.find(product => product.id === productName);
            setPrice(selectedProduct.rate);
        }
    }, [productName, allproducts])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (fullname == null || phone === null || address === null || productName === null || Price === null || qty === null || selectedGst === "") {
            setError(true);
            return;
        }

        const currentDate = new Date();

        // Extract the individual components of the date
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = currentDate.getFullYear();

        // Format the date as a string
        const formattedDate = `${day}/${month}/${year}`;
        setDate(formattedDate);

        const subTotal = (qty * Price);
        const total = ((subTotal * 18) / 100) + subTotal;
        setSubTotal(subTotal);
        setTotal(total);
        if (selectedGst === 'SGST') {
            const sgst = ((subTotal * 9) / 100);
            setgst(sgst.toString().replace(/,/g, ''));

        } else if (selectedGst === 'IGST') {
            const igst = (subTotal * 18) / 100;
            setgst(igst.toString().replace(/,/g, ''));
        }

        const querySnapshot = await getDocs(query(collection(db, "Quotations")));
        const empCount = querySnapshot.size;

        const prefix = 'BI-' + year;
        const pNO = String(empCount + 1).padStart(4, "0");
        const empId = prefix + "-" + pNO;
        setQuote(empId);

        const sanitizedPrice = Price.replace(/,/g, '');
        setPrice(sanitizedPrice);

        const sanitizedSubTotal = subTotal.toString().replace(/,/g, '');
        setSubTotal(sanitizedSubTotal);

        const sanitizedTotal = total.toString().replace(/,/g, '');
        setTotal(sanitizedTotal);

        setFormSubmitted(true);

        console.log(Number(Price).toLocaleString('en-IN'));

    };

    const handleDownload = async (e) => {
        try {
            // Prepare the WhatsApp message with a downloadable link
            const message = `Hello, here is your quotation:\nQuotation Number: ${quote}\nTotal: ${Total}\nDownload your PDF here: ${pdfUrl}`;

            // Format the phone number to remove any non-numeric characters
            const formattedPhone = phone.replace(/[^\d]/g, '');

            // Ensure the message is URL-encoded
            const encodedMessage = encodeURIComponent(message);

            // Construct the WhatsApp URL
            const whatsappURL = `https://wa.me/+91${formattedPhone}?text=${encodedMessage}`;

            // Open WhatsApp with the generated URL
            window.open(whatsappURL, '_blank');
        } catch (error) {
            console.error("Error uploading document or opening WhatsApp: ", error);
        }
    };


    const handleleSave = async (e) => {
        try {

            // Generate the PDF as a Blob
            const pdfBlob = await pdf(<MyDocument
                customerName={fullname}
                customerAddress={address}
                customerPhone={phone}
                productDetails={getSelectedProductDetails()}
                Quantity={qty}
                GST={gst}
                SUBTOTAL={SubTotal}
                TOTAL={Total}
                Price={Price}
                selectedGST={selectedGst}
                Date={date}
                Quote={quote}
                sellerName={sellerName}
                WordPrice={convertToWords(Total).charAt(0).toUpperCase() + convertToWords(Total).slice(1)}
            />).toBlob();

            // Upload the PDF to Firebase Storage
            const storageRef = ref(storage, `Quotations/${quote}.pdf`);
            await uploadBytes(storageRef, pdfBlob);

            // Get the downloadable URL for the PDF
            const downloadURL = await getDownloadURL(storageRef);
            setPdfUrl(downloadURL);

            // Save the quotation in Firestore
            await addDoc(collection(db, "Quotations"), {
                Name: fullname,
                Address: address,
                Phone: phone,
                Date: date,
                downloadURL: downloadURL,
                product: productName,
                quote:quote
            });
        } catch (error) {
            console.error("Error uploading document or opening WhatsApp: ", error);
        }
    };

    const convertToWords = (number) => {
        const words = numberToWords.toWords(number);

        // Custom rules for Indian numbering system
        const lakhs = Math.floor(number / 100000);
        const remaining = number % 100000;
        if (lakhs > 0 && remaining > 0) {
            return numberToWords.toWords(lakhs) + ' lakh ' + numberToWords.toWords(remaining);
        } else if (lakhs > 0) {
            return numberToWords.toWords(lakhs) + ' lakh';
        } else {
            return words;
        }
    };

    // Function to get details of selected product
    const getSelectedProductDetails = () => {
        const selectedProduct = allproducts.find(product => product.id === productName);
        return selectedProduct ? selectedProduct : null;
    };

    return (
        <>

            <div style={{ display: 'flex', flexDirection: 'column', background: '#171a1d', resize: 'cover', height: '180vh' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5vh' }}>
                    <section class="container">
                        <header style={{ fontFamily: "Protest Revolution", fontWeight: '400', fontStyle: 'normal', color: '#ba1103', fontSize: 26 }}>Bajarangi Industries</header>
                        <form class="form" onSubmit={handleSubmit}> {/* Add onSubmit event */}
                            <div class="input-box1">
                                <label>Full Name</label>
                                <input required="" placeholder="Enter full name" type="text" value={fullname} onChange={(el) => { setfullname(el.target.value) }} />
                            </div>
                            <div class="column">
                                <div class="input-box2">
                                    <label>Phone Number</label>
                                    <input required="" placeholder="Enter phone number" type='tel' value={phone} onChange={(e) => { setphone(e.target.value) }} />
                                </div>
                            </div>

                            <div class="input-box3_address">
                                <label>Address</label>
                                <div class="column">
                                    <input required="" placeholder="Enter street address" type="text" value={address} onChange={(fl) => { setaddress(fl.target.value) }} />
                                </div>
                            </div>

                            <div class="select-box1" style={{ marginTop: "1vh" }}>
                                <label style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Select The product</label>
                                <Select
                                    className="selector"
                                    options={products}
                                    name="product"
                                    value={products.find((o) => o.value === productName)}
                                    onChange={(e) => { setProduct(e.value) }}
                                />

                            </div>
                            <div class="select-box1" style={{ marginTop: "1vh" }}>
                                <label style={{ display: 'flex', justifyContent: 'center', fontSize: 20 }}>Select The Seller Name</label>
                                <Select
                                    className="selector"
                                    options={sellerOption}
                                    name="seller"
                                    value={sellerOption.find((o) => o.value === sellerName)}
                                    onChange={(e) => { setSellerName(e.value) }}
                                />

                            </div>
                            <div class="gst-box">
                                <label>GST</label>
                                <div class="gst-option">
                                    <div class="sgst">
                                        <input
                                            name="gst"
                                            id="check-sgst"
                                            type="radio"
                                            value="SGST"
                                            checked={selectedGst === "SGST"}
                                            onChange={() => setSelectedGst("SGST")} />
                                        <label for="check-sgst">SGST & CGST</label>
                                    </div>
                                    <div class="igst">
                                        <input
                                            name="gst"
                                            id="check-igst"
                                            type="radio"
                                            value="IGST"
                                            checked={selectedGst === "IGST"}
                                            onChange={() => setSelectedGst("IGST")} />
                                        <label for="check-igst">IGST</label>
                                    </div>
                                </div>
                            </div>
                            <div class="input-box3_address">
                                <label>Price & Quantity</label>
                                <div class="column">
                                    <input required="" placeholder="Enter Price" type="number" value={Price} onChange={(e) => { setPrice(e.target.value) }} />
                                    <input required="" placeholder="Quantity" type="number" value={qty} onChange={(fl) => { setQty(fl.target.value) }} />
                                </div>
                            </div>

                            <button type="submit">Submit</button> {/* Add type="submit" */}
                            {error && <p style={{ color: 'red', fontSize: 24, display: 'flex', justifyContent: 'flex-end' }}>Fill all the details</p>}
                        </form>
                    </section>
                </div>
                {formSubmitted && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '10vh', marginBottom: '5vh', }}>
                            <PDFViewer showToolbar={false} style={{ height: '70vh', width: '50vw' }}>
                                <MyDocument
                                    customerName={fullname}
                                    customerAddress={address}
                                    customerPhone={phone}
                                    productDetails={getSelectedProductDetails()} // Pass product details as props
                                    Quantity={qty}
                                    GST={gst}
                                    SUBTOTAL={SubTotal}
                                    TOTAL={Total}
                                    Price={Price}
                                    selectedGST={selectedGst}
                                    Date={date}
                                    Quote={quote}
                                    sellerName={sellerName}
                                    WordPrice={convertToWords(Total).charAt(0).toUpperCase() + convertToWords(Total).slice(1)}
                                />
                            </PDFViewer>
                            <PDFDownloadLink document={<MyDocument
                                customerName={fullname}
                                customerAddress={address}
                                customerPhone={phone}
                                productDetails={getSelectedProductDetails()}
                                Quantity={qty}
                                GST={gst}
                                SUBTOTAL={SubTotal}
                                TOTAL={Total}
                                Price={Price}
                                selectedGST={selectedGst}
                                Date={date}
                                Quote={quote}
                                sellerName={sellerName}
                                WordPrice={convertToWords(Total).charAt(0).toUpperCase() + convertToWords(Total).slice(1)}
                            />
                            } fileName="somename.pdf">
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download now!'
                                }
                            </PDFDownloadLink>
                        </div>
                    </>
                )}

                <div className="buttons-container">
                    <button onClick={handleleSave} disabled={!formSubmitted} className="save-button">
                        Save
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={pdfUrl === null}
                        className="whatsapp-button">
                        Send to WhatsApp
                    </button>
                </div>

            </div>

        </>
    );
};

export default Quoationpage;
