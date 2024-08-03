// src/components/ProductRow.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../Redux/productsSlice";

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState({
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

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">
        <input type="checkbox" className="mr-2" />
        {product.name}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={handleEditClick}
          className="text-blue-500 hover:underline"
        >
          {editing ? "Cancel" : "Quick Edit | Add Product Details"}
        </button>
      </td>
      <td className="px-4 py-2">
        {editing ? (
          <div>
            <input
              type="text"
              value={details.shape}
              onChange={(e) =>
                setDetails({ ...details, shape: e.target.value })
              }
              placeholder="Shape"
              className="border border-gray-300 p-2 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={details.length}
              onChange={(e) =>
                setDetails({ ...details, length: e.target.value })
              }
              placeholder="Length"
              className="border border-gray-300 p-2 rounded mb-2 w-full"
            />
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Material:</strong> {product.product_details?.Material}</p>
            <p><strong>Unit Length:</strong> {product.product_details?.Unit_Length}</p>
            <p><strong>Shape:</strong> {product.product_details?.Shape}</p>
          </div>
        )}
      </td>
      <td className="px-4 py-2">{product.price_per_kg} / KG</td>
    </tr>
  );
};

export default ProductRow;
