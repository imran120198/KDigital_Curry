import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice";
import ProductRow from "./ProductRow";

const ProductTable = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const limit = useSelector((state) => state.filter.limit);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          `https://kdigital-curry-backend.onrender.com/product?limit=${limit}`
        );
        const data = await response.json();
        dispatch(fetchProducts(data));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    loadProducts();
  }, [dispatch, limit]);

  useEffect(() => {
    if (searchQuery) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

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
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No products found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
