import React, { useState } from "react";
import { useThemeContext } from "./context/Themecontext";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import Footer from "./components/footer/Footer";
import ReactSwitch from "react-switch";
import "./App.css";

const App = () => {
  // Get the current theme from the context
  const { contextTheme, setContextTheme } = useThemeContext();

  // State for the switch value
  const [checked, setChecked] = useState(false);

  // Handler for the switch change event
  const handleSwitch = () => {
    // Change the theme in the context
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    // Update the switch value
    setChecked(!checked);
  };

  return (
    /*App container*/
    <div className="App" id={contextTheme}>
    {/*Navbar container*/}
      <Navbar />
      {/*Switch section*/}
      <span className="Mode">{contextTheme} Mode</span>
      <label className="react-switch-label" htmlFor="material-switch">
        <ReactSwitch
          checked={checked}
          onChange={handleSwitch}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={15}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={15}
          width={30}
          className="react-switch"
          id="material-switch"
        />
      </label>
      {/*Pages section*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="timer" element={<Timer />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
