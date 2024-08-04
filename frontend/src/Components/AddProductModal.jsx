import React from "react";

const AddProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] h-[550px]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <button
            type="button"
            className="font-bold text-black mb-4"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form>
          <div className="flex flex-row justify-between">
            <div className="mb-4 border border-black-600 w-[200px] pl-5">
              <label className="block font-medium text-gray-700 mb-2">
                Products
              </label>
              <ul>
                <li>Pipes</li>
                <li>Tubing</li>
                <li>Pipe Fittings</li>
                <li>Forged Fittings</li>
                <li>Flanges</li>
                <li>Valves</li>
                <li>Gaskets</li>
                <li>Instrumentation Fittings</li>
                <li>Sheets & Plates</li>
                <li>Bars</li>
                <li>Electrodes</li>
                <li>Bolts</li>
                <li>Fasteners</li>
                <li>Channels</li>
              </ul>
            </div>
            <div className="mb-4 border border-black-600 w-[200px] pl-5">
              <label className="block font-medium text-gray-700 mb-2">
                Material
              </label>
              <ul>
                <li>Alloy Steel</li>
                <li>Alluminium</li>
                <li>Carbon Steel</li>
                <li>Copper Nickel</li>
                <li>DUplex Steel</li>
                <li>Hastelloy</li>
                <li>Incoluy</li>
                <li>Inconel</li>
                <li>Low Temperature Carbon Steel</li>
                <li>Monel</li>
                <li>Nickel Alloy</li>
                <li>Stainless Steel</li>
                <li>Super Duplex Steel</li>
                <li>Titanium</li>
              </ul>
            </div>
            <div className="mb-4 border border-black-600 w-[200px] pl-5">
              <label className="block font-medium text-gray-700 mb-2">
                Grade
              </label>
              <ul>
                <li>F11</li>
                <li>F22</li>
                <li>F5</li>
                <li>F9</li>
                <li>F91</li>
                <li>F11</li>
                <li>F22</li>
                <li>F5</li>
                <li>F9</li>
                <li>F91</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center item-center">
            <button
              type="button"
              className="px-4 py-2 bg-blue-700 text-white rounded mr-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
