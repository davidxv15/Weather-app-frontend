import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/weather');
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

    // Function to convert temperature from Celsius to Fahrenheit
    const convertToCelsius = (temperature) => {
        return Math.round((temperature * 9/5) + 32);
      };

      // Function to convert wind speed from m/s to mph
const convertToMPH = (speed) => {
    return Math.round(speed * 2.23694); // 1 m/s = 2.23694 mph
};
const convertDewPoint = (celsius) => {
    return Math.round((celsius * 9/5) + 32);
  };

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData ? (
        <div>
          <h2>Temperature: {convertToCelsius(weatherData.temperature)}°F</h2>
          {/* <h2>Feels Like: {convertToCelsius(weatherData.temperatureApparent)}°F</h2> */}
          <h2>Humidity: {weatherData.humidity}%</h2>
          <h2>Wind Speed: {convertToMPH(weatherData.windSpeed)} MPH</h2>
          <h2>Wind Direction: {weatherData.windDirection}º</h2>
          <h2>Dew Point: {convertDewPoint(weatherData.dewPoint)}ºF</h2>
          {/* <h2>Visibility: {weatherData.visibility}</h2> */}
          {/* <h2>UV Index: {weatherData.uvIndex}</h2>
          <h2>Sunrise Time: {weatherData.sunriseTime}</h2>
          <h2>Sunset Time: {weatherData.sunsetTime}</h2> */}
          {/* Add more weather parameters here */}
        </div>
      ) : (
        <p>Loading Weather...</p>
      )}
    </div>
  );
};

export default Weather;
