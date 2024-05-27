import React, { useState } from "react";
import "./LocationSearchBar.css";

const LocationSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <div className="location-search-bar">
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter City, State, or Zip Code"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default LocationSearchBar;
