import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductType, setMaterial } from "../Redux/filterSlice";
import { setLimit } from "../Redux/productsSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const products = useSelector((state) => state.products.products);

  console.log("filter:", filter);

  const handleProductChange = (e) => {
    dispatch(setProductType(e.target.value));
  };

  const handleMaterialChange = (e) => {
    dispatch(setMaterial(e.target.value));
  };

  const handleLimitChange = (e) => {
    dispatch(setLimit(e.target.value));
  };

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="p-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <select
          value={filter.productType}
          onChange={handleProductChange}
          className="p-2 w-[200px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="">Products</option>
          <option value="Pipes">Pipes</option>
          <option value="Profiles">Profiles</option>
          <option value="Tubes">Tubes</option>
          <option value="Sheets">Sheets</option>
          <option value="Rods">Rods</option>
          <option value="Plates">Plates</option>
          <option value="Cables">Cables</option>
        </select>
        <select
          value={filter.material}
          onChange={handleMaterialChange}
          className="p-2 w-[200px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="">Material</option>
          <option value="Steel">Steel</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Copper">Copper</option>
          <option value="Brass">Brass</option>
          <option value="Iron">Iron</option>
          <option value="Fiber">Fiber</option>
          <option value="PVC">PVC</option>
        </select>
        <button className="w-[100px] border border-none bg-white border rounded-xl font-medium">
          Filter
        </button>
        <select className="p-2 w-[200px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
          <option value="">Bulk Action</option>
        </select>
        <button className="w-[100px] border border-none bg-white border rounded-xl font-medium">
          Apply
        </button>
      </div>
      <div className="flex flex-row p-4">
        <p className="text-lg mr-3 font-medium">Products</p>
        <select
          className="h-[30px]"
          value={products.limit}
          onChange={handleLimitChange}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
