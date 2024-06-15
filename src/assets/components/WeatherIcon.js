import React from "react";
import iconMapping from "../../weatherIconMapping.json";

const WeatherIcon = ({ code }) => {
  const getIconUrl = (code) => {
    const iconName = iconMapping[code] || "assets/icons/default.svg"; //default icon if none matched
    return `${process.env.PUBLIC_URL}/icons/${iconName}`; // path - where icons are stored
  };

  return (
    <img
      src={getIconUrl(code)}
      alt="Weather Icon"
      style={{ width: "90px", height: "90px" }}
    />
  );
};

export default WeatherIcon;
