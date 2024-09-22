import React from "react";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import { v4 as uuidv4 } from 'uuid';
import logo from '../logo.jpeg';
// import CloseIcon from "@mui/icons-material/Close";


const ProductForm = ({ isOpen, onClose }) => {

  const [productDetails, setProductDetails] = useState({
    id: "1",
    productName:
      "",
    hsncode: "84621030",
    modelNo: "BIL PP-100",
    rate: "105000",
    description: [
      'Paper Plate Size: 4" to 18" ',
      'Thali Dies: 10" to 18" ',
      'Dona Dies: 4" to 8" ',
      "Paper Material : 80 GSM to 500 GSM",
      "Production Rate: Paper Plate :Buffet 4000 pcs to 4500 Pcs/8-10Hr, Sitting 10000 pcs to 15000 Pcs/8-10Hr",
      "Power Source: 220v - 50 Hz.",
      "Power with motor : 2-3 kw ",
      "Electric Motor: 2 hp(Single Phase/ Three Phase)",
      "6 Ton Hydraulic Pressure. ",
      "Weight of Machine: 450Kg(Approx.)",
      "Power Consumption with Heater: 3 - 5 Units / hr.",
      "Oil Tank Capacity: 45 Liters.",
      "Heavy duty machinery spare parts",
      "Installation charges Extra",
      "Service & Warranty with 5 years ",
      " One year warranty on motor ",
      "Hydraulic Oil Extra",
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  const handleClick = async () => {
    const id = uuidv4();
    await setDoc(doc(db, "Products", id), productDetails);
    alert("success");
  }

  return (
    <>
      {/* From Uiverse.io by themrsami  */}
      <div className="mx-auto max-w-[432px] bg-white rounded-md shadow-lg drop-shadow-md">
        <div className="px-4 py-3 flex justify-between">
          <div>
            <h2 className="font-bold" style={{ fontSize: 32 }}>
              Bazarangi Indrusties
            </h2>
            <p className="text-gray-500" style={{ fontSize: 15 }}>
              It's quick and easy.
            </p>
          </div>
          <div style={{ cursor: "pointer" }} className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <hr className="bg-gray-600" />
        <div className="px-4 pt-3 pb-6 space-y-3">
          <div className="space-x-3 flex">
            <input
              name="modelNo"
              type="text"
              placeholder="Model No"
              onChange={handleChange}
              value={productDetails.modelNo}
              className="flex-1 ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
            />
            <input
              name="hsncode"
              type="text"
              placeholder="HSN Code"
              onChange={handleChange}
              value={productDetails.hsncode}
              className="flex-1 ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
            />
          </div>
          <div>
            <input
              name="productName"
              type="text"
              placeholder="Product Name"
              onChange={handleChange}
              value={productDetails.productName}
              className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
            />
          </div>
          <div>
            <input
              name="rate"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              value={productDetails.rate}
              className="w-full ring-1 ring-gray-400 rounded-md text-md px-2 py-2 outline-none bg-gray-100 focus:placeholder-gray-500"
            />
          </div>

          <div>
            <p className="text-gray-600" style={{ fontSize: 11 }}>
              People who use our service may have uploaded your contact information
              to Facebook.
              <a
                href=""
                className="hover:text-blue-900 font-medium hover:underline"
              >
                Learn more
              </a>
              .
            </p>
            <p className="text-gray-600 mt-4" style={{ fontSize: 11 }}>
              By clicking Sign Up, you agree to our
              <a
                href=""
                className="hover:text-blue-900 font-medium hover:underline"
              >
                Terms
              </a>
              ,
              <a
                href=""
                className="hover:text-blue-900 font-medium hover:underline"
              >
                Privacy Policy
              </a>
              and
              <a
                href=""
                className="hover:text-blue-900 font-medium hover:underline"
              >
                Cookies Policy
              </a>
              . You may receive SMS notifications from us and can opt out at any
              time.
            </p>
          </div>
          <div className="text-center">
            <button
              className="text-white font-bold px-16 py-1 rounded-md"
              style={{ backgroundColor: "#00A400", fontSize: 18 }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
