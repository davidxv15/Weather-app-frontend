import React from "react";
import Weather from "./Weather";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Weather />
      <Footer />
    </div>
  );
};

export default App;
