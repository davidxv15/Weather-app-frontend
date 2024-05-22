import React from "react";
import iconMapping from "../../weatherIconMapping.json";

const WeatherIcon = ({ code }) => {
  const getIconUrl = (code) => {
    const iconName = iconMapping[code] || "assets/icons/default.svg"; // Fallback to default icon if none matched
    return `${process.env.PUBLIC_URL}/${iconName}`;  // Adjust the path according to where your icons are stored
  };

  return (
    <img
      src={getIconUrl(code)}
      alt="Current Weather Icon"
      style={{ width: "100px", height: "100px" }}
    />
  );
};

export default WeatherIcon;
