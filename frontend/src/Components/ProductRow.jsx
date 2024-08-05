import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice";

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();
  const [expandedRow, setExpandedRow] = useState(null);
  const [editData, setEditData] = useState({
    material: "",
    shape: "",
    length: "",
    thickness: "",
    surfaceFinished: "",
    outsideDiameter: "",
    price: "",
  });

  const handleExpand = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
      setEditData({
        material: product.material || "",
        shape: product.product_details.shape || "",
        length: product.product_details.length || "",
        thickness: product.product_details.thickness || "",
        surfaceFinished: product.product_details.surfaceFinished || "",
        outsideDiameter: product.product_details.outsideDiameter || "",
        price: product.price || "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `https://kdigital-curry-backend.onrender.com/product/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            material: editData.material,
            product_details: {
              shape: editData.shape,
              length: editData.length,
              thickness: editData.thickness,
              surfaceFinished: editData.surfaceFinished,
              outsideDiameter: editData.outsideDiameter,
            },
            price: editData.price,
          }),
        }
      );
      if (response.ok) {
        dispatch(fetchProducts());
        setExpandedRow(null);
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setExpandedRow(null);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="py-2 px-4 border-b">
          <input type="checkbox" className="m-2" />
          {product.name}
        </td>
        <td className="py-2 px-4 border-b">
          <button
            className="text-blue-500 mr-2"
            onClick={() => handleExpand(product._id)}
          >
            {expandedRow === product._id
              ? "Collapse"
              : "Quick Edit | Add Product Details"}
          </button>
        </td>
        <td className="py-2 px-4 border-b">
          <div>
            <strong>Material: </strong>
            {product.material}
          </div>
          <div>
            <strong>Unit Length:</strong> {product.product_details?.thickness}
          </div>
          <div>
            <strong>Shape: </strong>
            {product.product_details?.shape}
          </div>
        </td>
        <td className="py-2 px-4 border-b">
          {expandedRow === product._id ? (
            <input
              type="text"
              name="price"
              value={editData.price}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            `${product.price}/KG`
          )}
        </td>
      </tr>
      {expandedRow === product._id && (
        <tr>
          <td colSpan="4" className="py-2 px-4 border-b bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Material:</label>
                <input
                  type="text"
                  name="material"
                  value={editData.material}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Shape:</label>
                <input
                  type="text"
                  name="shape"
                  value={editData.shape}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Length:</label>
                <input
                  type="text"
                  name="length"
                  value={editData.length}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Thickness:</label>
                <input
                  type="text"
                  name="thickness"
                  value={editData.thickness}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Surface Finish:</label>
                <input
                  type="text"
                  name="surfaceFinished"
                  value={editData.surfaceFinished}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Outside Diameter:</label>
                <input
                  type="text"
                  name="outsideDiameter"
                  value={editData.outsideDiameter}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdate(product._id)}
              >
                Update
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default ProductRow;
