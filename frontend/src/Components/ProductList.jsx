import React, { useState } from 'react';
import ProductTable from './ProductTable';
import Filters from './Filters';
import AddProductModal from './AddProductModal';

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="w-full h-full flex items-start flex-col">
      <div className="p-4">
        <button
          className="p-2 bg-blue-700 text-white border rounded-full w-[200px]"
          onClick={handleOpenModal}
        >
          + Add Product
        </button>
      </div>
      <div className="p-4 flex">
        <input
          placeholder="Search Products"
          className="w-[500px] border border-grey-800 p-2 rounded-l-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="p-2 bg-blue-700 text-white w-[100px] rounded-r-lg"
        >
          Search
        </button>
      </div>
      <Filters />
      <div>
        <ProductTable searchQuery={searchQuery} />
      </div>
      <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductList;
