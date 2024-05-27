import React, { useState } from "react";
import "./LocationSearchBar.css";

const LocationSearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="location-search-bar">
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter City, State, or Zip Code"
      />
      <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default LocationSearchBar;
