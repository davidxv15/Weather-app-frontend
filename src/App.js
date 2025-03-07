import React from "react";
import Weather from "./Weather";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import SingingBowl from "./SingingBowl";
import "./App.css";

const App = () => {
  return (
    <div className="App ui-wrapper">
      {/* possible animations */}
      <SingingBowl />
      <Header />
      <Weather />
      <Footer />
    </div>
  );
};

export default App;
