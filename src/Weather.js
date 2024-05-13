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

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData ? (
        <div>
          <h2>Temperature: {weatherData.temperature}</h2>
          <h2>Feels Like: {weatherData.temperatureApparent}</h2>
          <h2>Humidity: {weatherData.humidity}%</h2>
          <h2>Wind Speed: {weatherData.windSpeed}</h2>
          <h2>Wind Direction: {weatherData.windDirection}</h2>
          <h2>Dew Point: {weatherData.dewPoint}</h2>
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
