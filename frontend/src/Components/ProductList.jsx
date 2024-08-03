import React from "react";
import ProductTable from "./ProductTable";

const ProductList = () => {
  return (
    <div className="w-full h-full flex items-start flex flex-col">
      <div className="p-4">
        <button className="p-2 bg-blue-700 text-white border rounded-full w-[200px]">
          + Add Product
        </button>
      </div>
      <div className="p-4">
        <input
          placeholder="Search Products"
          className="w-[500px] border border-grey-800 p-2 rounded-l-lg"
        />
        <button className="p-2 bg-blue-700 text-white w-[100px] rounded-r-lg">
          Search
        </button>
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductList;
