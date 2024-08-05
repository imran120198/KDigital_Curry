import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/productsSlice";
import ProductRow from "./ProductRow";
import { Hourglass } from "react-loader-spinner";

const ProductTable = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const filter = useSelector((state) => state.filter);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://kdigital-curry-backend.onrender.com/product`
        );
        const data = await response.json();
        dispatch(fetchProducts(data));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      }
    };

    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    let results = products;

    if (filter.productType) {
      results = results.filter(
        (product) => product.productType === filter.productType
      );
    }

    if (filter.material) {
      results = results.filter(
        (product) => product.material === filter.material
      );
    }

    if (searchQuery) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(results.slice(0, filter.limit));
  }, [filter, searchQuery, products]);

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
          {loading ? (
            <tr>
              <td colSpan="4">
                <div className="flex items-center justify-center h-80">
                  <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    colors={["#306cce", "#72a1ed"]}
                  />
                </div>
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
