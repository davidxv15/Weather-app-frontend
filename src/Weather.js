import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherCodes from "./weatherCodes.json";
import WeatherIcon from "./assets/components/WeatherIcon";
import LocationSearchBar from "./assets/components/LocationSearchBar";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(""); //MAKE EMPTY
  // const [location, setLocation] = useState("42.3478,-71.0466"); //MAKE EMPTY
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (newLocation) => {
    console.log("New location:", newLocation);
    setLocation(newLocation);
  };

  const handleSelectFavorite = (favoriteLocation) => {
    setLocation(favoriteLocation);
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:3000/favorites");
      setFavorites(response.data.map(fav => fav.location));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleAddFavorite = async () => {
    if (location) {
      try {
        const response = await axios.post("http://localhost:3000/favorites", { location });
        console.log(response.data.message);
        fetchFavorites();
      } catch (error) {
        console.error("Error handling favorite:", error);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);


  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
      try {
        console.log("Fetching weather data for location:", location);
        const response = await axios.get("http://localhost:3000/weather", {
          params: { location },
        });
        setWeatherData(response.data);
        console.log("Current Weather Code:", response.data.weatherCode);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    };

    fetchWeatherData();
  }, [location]);

  // Function to convert temperature from Celsius to Fahrenheit
  const convertToCelsius = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  // Function to convert wind speed from m/s to mph
  const convertToMPH = (speed) => {
    return Math.round(speed * 2.23694); // 1 m/s = 2.23694 mph
  };
  const convertDewPoint = (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  // Function to convert wind direction in degrees to compass direction
  const convertWindDirection = (degrees) => {
    // Normalize the degrees to ensure they fall within the range [0, 360)
    degrees = (degrees + 360) % 360;
    // Define the compass directions
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    // Calculate the index of the direction based on the degrees
    const index = Math.round(degrees / 45) % 8;
    // Return the corresponding direction from the array
    return directions[index];
  };

  return (
    <div>
      {/* <h1>Weather App</h1> */}
      <LocationSearchBar onSearch={handleSearch} favorites={favorites} onSelectFavorite={handleSelectFavorite} />
      <button onClick={handleAddFavorite}>Favorite</button>
      {weatherData ? (
        <div>
          <h2>Location: {location}</h2>
          <WeatherIcon code={weatherData.weatherCode} />
          <h4>
            Forecast:{" "}
            {weatherCodes[weatherData.weatherCode] ||
              "Description not available"}
          </h4>
          <h4>Temperature: {convertToCelsius(weatherData.temperature)}°F</h4>
          {/* <h2>Feels Like: {convertToCelsius(weatherData.temperatureApparent)}°F</h2> */}
          <h4>Humidity: {weatherData.humidity}%</h4>
          <h4>Wind Speed: {convertToMPH(weatherData.windSpeed)} MPH</h4>
          <h4>
            Wind Direction: {weatherData.windDirection}°{" "}
            {convertWindDirection(weatherData.windDirection)}
          </h4>

          <h4>Dew Point: {convertDewPoint(weatherData.dewPoint)}ºF</h4>
        </div>
      ) : (
        <p className="Loading">Loading Weather...</p>
      )}
    </div>
  );
};

export default Weather;
