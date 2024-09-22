import React, { useEffect, useState } from "react";
import "./QuotationTable.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";

export default function QuotationTable() {

  const [quotations, setQuotations] = useState([]);

  const handleDownload = async (url, phone, quote) => {
    try {
      // Prepare the WhatsApp message with a downloadable link
      const message = `Hello, here is your quotation:\nQuotation Number:${quote}\n Download your PDF here: ${url}`;

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

  const downloadPDF = (url) => {
    // Logic to download PDF goes here

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'your-pdf-name.pdf'); // you can also specify a file name
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the temporary link element
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchQuotatins = async () => {
      let allProducts = [];
      const productsSnapshot = await getDocs(collection(db, `Quotations`));
      productsSnapshot.forEach((doc) => {
        const data = doc.data();
        allProducts.push({
          id: doc.id,
          ...data,
        });
      });
      setQuotations(allProducts);
    };

    fetchQuotatins();
  }, [])
  return (
    <div className="Main">
      <div className="square">
        <h1 style={{ color: 'white', fontSize: '35px' }}>Quotation</h1>
        <table className="custom-table">
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Quotation Number</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation, index) => (
              <tr key={index}>
                <td>{quotation.Name}</td>
                <td>{quotation.Phone}</td>
                <td>{quotation.quote}</td>
                <td>{quotation.Date}</td>
                <td>
                  <button
                    onClick={() => downloadPDF(quotation.downloadURL)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 8L7 10.5L9.5 8M7 10.5v-7" /><path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13" /></g></svg>
                  </button>

                  <button
                    onClick={() => handleDownload(quotation.downloadURL,quotation.Phone , quotation.quote)}
                    style={{marginLeft:'30%'}}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14"><g fill="none" stroke="green" stroke-linecap="round" stroke-linejoin="round"><path d="M7 .88C3.665.88.88 3.67.88 7.002a6.14 6.14 0 0 0 1.025 3.39L.877 13.127l3.439-.622A6.13 6.13 0 0 0 7 13.121c3.338.002 6.127-2.784 6.127-6.118c0-3.33-2.79-6.126-6.127-6.124Z" /><path d="M7.337 9.7c.829.531 1.692.144 2.294-.305c.415-.31.402-.907.047-1.285l-.7-.745c-.265.265-.783.397-1.142.287c-.773-.235-1.097-.637-1.36-1.047c-.301-.47.04-1.172.305-1.437l-.78-.712c-.329-.3-.828-.35-1.115-.01c-.568.673-.92 1.696-.503 2.347c.75 1.169 1.785 2.156 2.954 2.906Z" /></g></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
