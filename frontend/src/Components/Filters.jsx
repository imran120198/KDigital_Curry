import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setMaterial, setGrade } from "../Redux/filterSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleProductChange = (e) => {
    dispatch(setProduct(e.target.value));
  };

  const handleMaterialChange = (e) => {
    dispatch(setMaterial(e.target.value));
  };

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="p-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <select
          value={filter.product}
          onChange={handleProductChange}
          className="p-2 w-[200px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="">Products</option>
          <option value="Pipes">Pipes</option>
        </select>
        <select
          value={filter.material}
          onChange={handleMaterialChange}
          className="p-2 w-[200px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          <option value="">Material</option>
          <option value="Stainless Steel">Stainless Steel</option>
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
        <select className="h-[30px]">
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
