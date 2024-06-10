import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      onSearch(value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for books..."
      value={query}
      onChange={handleInputChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
