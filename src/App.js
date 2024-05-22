import React from 'react';
import Weather from './Weather';
import Footer from './assets/components/Footer';
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Weather />
      <Footer />
    </div>
  );
};

export default App;
