import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherCodes from "./weatherCodes.json";
import WeatherIcon from "./assets/components/WeatherIcon";
import "./App.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/weather");
        setWeatherData(response.data);
        console.log("Current Weather Code:", response.data.weatherCode);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

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
      <h1>Weather App</h1>
      {weatherData ? (
        <div>
          <WeatherIcon code={weatherData.weatherCode} />
          <h2>
            Forecast:{" "}
            {weatherCodes[weatherData.weatherCode] ||
              "Description not available"}
          </h2>
          <h2>Temperature: {convertToCelsius(weatherData.temperature)}°F</h2>
          {/* <h2>Feels Like: {convertToCelsius(weatherData.temperatureApparent)}°F</h2> */}
          <h2>Humidity: {weatherData.humidity}%</h2>
          <h2>Wind Speed: {convertToMPH(weatherData.windSpeed)} MPH</h2>
          <h2>
            Wind Direction: {weatherData.windDirection}°{" "}
            {convertWindDirection(weatherData.windDirection)}
          </h2>

          <h2>Dew Point: {convertDewPoint(weatherData.dewPoint)}ºF</h2>
        </div>
      ) : (
        <p>Loading Weather...</p>
      )}
    </div>
  );
};

export default Weather;
