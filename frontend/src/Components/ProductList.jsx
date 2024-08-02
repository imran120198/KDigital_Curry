import React from "react";

const ProductList = () => {
  return (
    <div className="w-full h-full flex items-start p-4 flex flex-col">
      <div>
        <button className="p-2 bg-blue-700 text-white border rounded-full w-[200px]">
          + Add Product
        </button>
      </div>
      <div>
        <input
          placeholder="Search Products"
          className="w-[600px] border border-grey-800 p-2 mt-10"
        />
        <button className="p-2 bg-blue-700 text-white w-[100px]">Search</button>
      </div>
    </div>
  );
};

export default ProductList;
