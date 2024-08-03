// src/components/ProductTable.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice";
import ProductRow from "./ProductRow";

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div className="p-4">Loading...</div>;
  if (status === "failed")
    return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <table className="table-fixed w-full border-collapse bg-white shadow-md rounded-xl">
        <thead className="bg-blue-100 text-left text-gray-600">
          <tr>
            <th className="px-4 py-2">
              <input type="checkbox" className="mr-2" />
              Products
            </th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Product Details</th>
            <th className="px-4 py-2">Price in Unit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;