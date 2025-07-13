import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?search=${searchTerm}&location=${location}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white p-4 shadow-lg rounded-lg -mt-10 relative z-10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
          <input
            type="text"
            id="search"
            placeholder="Nom d'hôtel ou commodités"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
          <input
            type="text"
            id="location"
            placeholder="Ville ou région"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="self-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition w-full md:w-auto"
          >
            Rechercher
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;