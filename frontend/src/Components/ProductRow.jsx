import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../Redux/productsSlice";

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState({
    material: product.material || "",
    shape: product.product_details?.Shape || "",
    length: product.product_details?.Unit_Length || "",
  });

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    dispatch(updateProduct({ id: product.id, details }));
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">
        <input type="checkbox" className="mr-2" />
        {product.name}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={handleEditClick}
          className={`text-blue-500 ${
            editing ? "bg-blue-100" : "bg-white"
          } px-2 py-1 rounded`}
        >
          {editing ? "Cancel" : "Quick Edit | Add Product Details"}
        </button>
      </td>
      <td className="px-4 py-2">
        {editing ? (
          <div className="p-4 border-t border-gray-200 mt-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Material</label>
              <input
                type="text"
                name="material"
                value={details.material}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Shape</label>
              <input
                type="text"
                name="shape"
                value={details.shape}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Unit Length</label>
              <input
                type="text"
                name="length"
                value={details.length}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Unit Length:</strong> {product.product_details?.thickness}
            </p>
            <p>
              <strong>Shape:</strong> {product.product_details?.shape}
            </p>
          </div>
        )}
      </td>
      <td className="px-4 py-2">{product.price} / KG</td>
    </tr>
  );
};

export default ProductRow;
