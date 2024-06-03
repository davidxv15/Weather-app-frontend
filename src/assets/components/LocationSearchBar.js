import React, { useState } from "react";
import "./LocationSearchBar.css";

const LocationSearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
      <form onSubmit={handleSubmit} className="location-search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter City"
      />
      <button type="submit">Search</button>
      </form>
  );
};

export default LocationSearchBar;
