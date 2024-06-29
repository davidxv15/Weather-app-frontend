import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="powered">
        Powered by{" "}
        <a
          href="https://www.tomorrow.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tomorrow.io
        </a>{" "}
        &{" "}
        <a href="https://sunrisesunset.io/" target="_blank">
          SunriseSunset.io
        </a>
      </p>
    </footer>
  );
};

export default Footer;
