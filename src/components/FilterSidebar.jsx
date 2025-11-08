import React from 'react';
import { X } from 'lucide-react';
import { categories } from '../data/products';

const FilterSidebar = ({ filters, setFilters, isOpen, onClose }) => {
  const handleCategoryChange = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
  };

  const handlePriceChange = (min, max) => {
    setFilters({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, minRating: rating });
  };

  const handleStockChange = (inStock) => {
    setFilters({ ...filters, inStock });
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      minRating: 0,
      inStock: false,
    });
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white p-6 shadow-lg lg:shadow-none rounded-lg overflow-y-auto z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'all'}
                onChange={() => handleCategoryChange('all')}
                className="text-pet-blue focus:ring-pet-blue"
              />
              <span className="text-gray-700">All Products</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.id}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="text-hospital-primary focus:ring-hospital-primary"
                />
                <span className="text-gray-700">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={!filters.minPrice && !filters.maxPrice}
                onChange={() => handlePriceChange(undefined, undefined)}
                className="text-pet-blue focus:ring-pet-blue"
              />
              <span className="text-gray-700">All Prices</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.minPrice === 0 && filters.maxPrice === 25}
                onChange={() => handlePriceChange(0, 25)}
                className="text-pet-blue focus:ring-pet-blue"
              />
              <span className="text-gray-700">Under $25</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.minPrice === 25 && filters.maxPrice === 50}
                onChange={() => handlePriceChange(25, 50)}
                className="text-pet-blue focus:ring-pet-blue"
              />
              <span className="text-gray-700">$25 - $50</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.minPrice === 50 && filters.maxPrice === 100}
                onChange={() => handlePriceChange(50, 100)}
                className="text-pet-blue focus:ring-pet-blue"
              />
              <span className="text-gray-700">$50 - $100</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.minPrice === 100}
                onChange={() => handlePriceChange(100, undefined)}
                className="text-pet-blue focus:ring-pet-blue"
              />
              <span className="text-gray-700">Above $100</span>
            </label>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="text-pet-blue focus:ring-pet-blue"
                />
                <span className="text-gray-700">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleStockChange(e.target.checked)}
              className="text-pet-blue focus:ring-pet-blue rounded"
            />
            <span className="text-gray-700 font-semibold">In Stock Only</span>
          </label>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Clear All Filters
        </button>
      </div>
    </>
  );
};

export default FilterSidebar;
