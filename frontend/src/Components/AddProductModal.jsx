import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/productsSlice";

const categories = {
  products: [
    "Pipes",
    "Tubing",
    "Pipe Fittings",
    "Forged Fittings",
    "Flanges",
    "Valves",
    "Gaskets",
    "Instrumentation Fittings",
    "Sheets & Plates",
    "Bars",
    "Electrodes",
    "Fasteners",
    "Bolts",
    "Channels",
  ],
  materials: [
    "Alloy Steel",
    "Aluminum",
    "Carbon Steel",
    "Copper Nickel",
    "Duplex Steel",
    "Hastelloy",
    "Incoluy",
    "Inconel",
    "Low Temperature Carbon Steel",
    "Monel",
    "Nickel Alloy",
    "Stainless Steel",
    "Super Duplex Steel",
    "Titanium",
  ],
  grades: {
    "Alloy Steel": ["Alloy Steel A1", "Alloy Steel A2", "Alloy Steel A3"],
    Aluminum: [
      "Aluminum A2",
      "Aluminum A3",
      "Aluminum A4",
      "Aluminum A1",
      "Aluminum A5",
      "Aluminum A6",
      "Aluminum A7",
      "Aluminum A8",
      "Aluminum A9",
    ],
    "Carbon Steel": ["Carbon Steel C1", "Carbon Steel C2", "Carbon Steel C3"],
    "Copper Nickel": [
      "Copper Nickel CN1",
      "Copper Nickel CN2",
      "Copper Nickel CN3",
    ],
    "Duplex Steel": [
      "Duplex Steel DS1",
      "Duplex Steel DS2",
      "Duplex Steel DS3",
    ],
    Hastelloy: ["Hastelloy H1", "Hastelloy H2", "Hastelloy H3"],
    Incoluy: [],
    Inconel: [],
    "Low Temperature Carbon Steel": [
      "Carbon Steel C1",
      "Carbon Steel C2",
      "Carbon Steel C3",
    ],
    Monel: [],
    "Nickel Alloy": [],
    "Stainless Steel": [
      "Stainless Steel 304",
      "Stainless Steel 308",
      "Stainless Steel 306",
      "Stainless Steel 311",
    ],
    "Super Duplex Steel": [],
    Titanium: [],
  },
};

const AddProductModal = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setSelectedMaterial("");
    setSelectedGrades([]);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSelectedGrades([]);
  };

  const handleGradeToggle = (grade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleSubmit = async () => {
    if (selectedProduct && selectedMaterial && selectedGrades.length) {
      const newProduct = {
        name: selectedProduct,
        material: selectedMaterial,
        grade: selectedGrades.join(", "),
        details: `Material: ${selectedMaterial}\nGrades: ${selectedGrades.join(
          ", "
        )}`,
      };

      try {
        const response = await fetch(
          "https://kdigital-curry-backend.onrender.com/product/addProduct",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add product");
        }
        dispatch(addProduct(newProduct));
        onClose();
      } catch (error) {
        console.error("Error adding product:", error);
        setError(error.message);
      }
    } else {
      console.log("Validation failed:", {
        selectedProduct,
        selectedMaterial,
        selectedGrades,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] overflow-y-auto">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold mb-4">Add Products</h2>
          <button onClick={onClose} className="ml-2 py-1 px-4 font-bold ">
            X
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="h-[400px] overflow-y-auto">
            <h3 className="text-md font-medium mb-2">Products</h3>
            <ul className="list-none p-0 m-0">
              {categories.products.map((product) => (
                <li
                  key={product}
                  onClick={() => handleProductChange(product)}
                  className={`cursor-pointer p-2 mb-1 rounded ${
                    selectedProduct === product
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[400px] overflow-y-auto">
            <h3 className="text-md font-medium mb-2">Material</h3>
            <ul className="list-none p-0 m-0">
              {categories.materials.map((material) => (
                <li
                  key={material}
                  onClick={() => handleMaterialChange(material)}
                  className={`cursor-pointer p-2 mb-1 rounded ${
                    selectedMaterial === material
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {material}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[400px] overflow-y-auto">
            <h3 className="text-md font-medium mb-2">Grades</h3>
            <ul className="list-none p-0 m-0">
              {categories.grades[selectedMaterial]?.map((grade) => (
                <li
                  key={grade}
                  onClick={() => handleGradeToggle(grade)}
                  className={`cursor-pointer p-2 mb-1 rounded flex items-center ${
                    selectedGrades.includes(grade)
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {grade}
                  <input
                    type="checkbox"
                    checked={selectedGrades.includes(grade)}
                    onChange={() => handleGradeToggle(grade)}
                    className="ml-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {error && (
          <div className="mt-4 text-red-600">
            <p>Error: {error}</p>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
