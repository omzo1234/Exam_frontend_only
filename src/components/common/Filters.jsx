import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(0);

  const handleApplyFilters = () => {
    onFilter({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating: rating
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Filtres</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Prix (${priceRange[0]} - ${priceRange[1]})</label>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Note minimum</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`p-1 ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Appliquer les filtres
      </button>
    </div>
  );
};

export default Filters;