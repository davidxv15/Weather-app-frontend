import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./LocationSearchBar.css";
import { backendURL } from "./assets/config";

const LocationSearchBar = ({ onSearch, favorites, onSelectFavorite }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectValue, setSelectValue] = useState("none");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    const handleTripleClick = (e) => {
      if (e.detail === 3) {
        inputRef.current.select();
      }
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("click", handleTripleClick);

    return () => {
      inputElement.removeEventListener("click", handleTripleClick);
    };
  }, []);

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
    const url = `${backendURL}/places?input=${query}`;

    try {
      console.log(`Fetching suggestions for: ${query}`);
      const response = await axios.get(url);
      console.log("API Response:", response.data);
      const predictions = response.data.predictions.map(
        (prediction) => prediction.description
      );
      setSuggestions(predictions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 300);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  const handleSelectFavorite = (favoriteLocation) => {
    onSelectFavorite(favoriteLocation);
    setSelectValue("none");
  };

  return (
    <form onSubmit={handleSubmit} className="location-search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter location..."
        ref={inputRef}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <button type="submit">Search</button>
      <br />
      <select
        value={selectValue}
        onChange={(e) => handleSelectFavorite(e.target.value)}
      >
        <option value="none" className="faveCities" disabled hidden>
          Favorite cities
        </option>
        {favorites.map((favorite, index) => (
          <option key={index} value={favorite}>
            {favorite}
          </option>
        ))}
      </select>
    </form>
  );
};

export default LocationSearchBar;
