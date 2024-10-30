import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', query);
    // You can add functionality here to perform the search
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Search</h2>
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter your search query..."
            className="border border-gray-300 rounded-l-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
