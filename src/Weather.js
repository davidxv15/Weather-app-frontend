import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherCodes from "./weatherCodes.json";
import WeatherIcon from "./assets/components/WeatherIcon";
import LocationSearchBar from "./assets/components/LocationSearchBar";
import Loader from "react-loaders";
import "loaders.css/loaders.min.css";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(""); //MAKE EMPTY
  // const [location, setLocation] = useState("42.3478,-71.0466"); //MAKE EMPTY
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

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
      const sortedFavorites = response.data.map((fav) => fav.location).sort();
      setFavorites(sortedFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleAddFavorite = async () => {
    if (location) {
      try {
        const response = await axios.post("http://localhost:3000/favorites", {
          location,
        });
        console.log(response.data.message);
        fetchFavorites();
        setIsFavorited(!isFavorited);
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

          let data = response.data;

          // Determine if it's night time at the location
          const isNightTime = checkIfNightTime(data);

          // Modify weatherCode if it's night time, here, it's adding the '1' I need to access my nighttime version of the weatherCode icon
          if (isNightTime) {
            data.weatherCode = `${data.weatherCode}1`;
            console.log(
              `Modified weatherCode for night time: ${data.weatherCode}`
            );
          } else {
            console.log(
              `Weather code remains unchanged for day time: ${data.weatherCode}`
            );
          }

          setWeatherData(data);
          console.log("Current Weather Code:", data.weatherCode);

          // will check if the location is already favorited
          const isFavorite = favorites.includes(location);
          setIsFavorited(isFavorite);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [location]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const checkIfNightTime = (data) => {
    const currentTime = new Date();
    const sunrise = new Date(data.sunriseTime);
    const sunset = new Date(data.sunsetTime);

    return currentTime < sunrise || currentTime > sunset;
  };

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

  let loader = <Loader type="ball-pulse-rise" />;

  return (
    <div className="container">
      {/* <h1>Weather App</h1> */}
      <LocationSearchBar
        onSearch={handleSearch}
        favorites={favorites}
        onSelectFavorite={handleSelectFavorite}
      />
      <div className="wrapper">
        {weatherData ? (
          <div className="weather-info">
            <h2>{location}</h2>
            <button
              className={`favorite-button ${isFavorited ? "favorited" : ""}`}
              onClick={handleAddFavorite}
            >
              {isFavorited ? "Unfavorite" : "Favorite"}
            </button>
            <WeatherIcon code={weatherData.weatherCode} />
            <h4 className="temp"><span className="number">
              {convertToCelsius(weatherData.temperature)}</span>°F
            </h4>
            <h4 className="forecast">
              {" "}
              {weatherCodes[weatherData.weatherCode] ||
                "Description not available"}
            </h4>
            {/* <h2>Feels Like: {convertToCelsius(weatherData.temperatureApparent)}°F</h2> */}
            <h4>Humidity: <span className="number">{weatherData.humidity}</span>%</h4>
            <h4>Wind Speed: <span className="number">{convertToMPH(weatherData.windSpeed)}</span> MPH</h4>
            <h4>
              Wind Direction: <span className="number">{weatherData.windDirection}</span>°{" "}
              {convertWindDirection(weatherData.windDirection)}
            </h4>

            <h4>Dew Point: <span className="number">{convertDewPoint(weatherData.dewPoint)}</span>° F</h4>
            <h4>Sunrise: <span className="number">{formatTime(weatherData.sunriseTime)}</span></h4>
            <h4>Sunset: <span className="number">{formatTime(weatherData.sunsetTime)}</span></h4>
          </div>
        ) : (
          <div className="loading-container">
            <p className="Loading">Checking Forecasts...</p>
            <Loader type="ball-pulse" active />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
