import React, { useState } from "react";
import axios from 'axios';
import debounce from 'lodash.debounce';
import "./LocationSearchBar.css";

const LocationSearchBar = ({ onSearch, favorites, onSelectFavorite }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = debounce(async (query) => {
    const url = `http://localhost:3000/places?input=${query}`;

    try {
      console.log(`Fetching suggestions for: ${query}`);
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      const predictions = response.data.predictions.map((prediction) => prediction.description);
      setSuggestions(predictions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, 300);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
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
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <select onChange={(e) => onSelectFavorite(e.target.value)}>
        <option value="">Favorite cities</option>
        {favorites.map((favorite, index) => (
          <option key={index} value={favorite}>{favorite}</option>
        ))}
      </select>

      </form>
      
  );
};

export default LocationSearchBar;
