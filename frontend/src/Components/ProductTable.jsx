import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice";
import ProductRow from "./ProductRow";

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products)

  return (
    <div className="p-4">
      <table className="table-fixed w-full border-collapse bg-white shadow-md border rounded-lg">
        <thead className="bg-blue-300 text-left text-gray-700">
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
