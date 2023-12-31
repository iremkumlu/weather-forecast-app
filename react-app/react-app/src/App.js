import React, { useState } from "react";
import Wheatherresult from "./Wheatherresult";
import "./App.css";

function App() {
  const APP_KEY = "6b0ca5c2e85340f8a83132606230507";
  let cityinput = "";
  const [wheatherdata, setwheatherdata] = useState([]);
  function citytext() {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityinput = e.target.value;
      console.log(cityinput);
    });
  }
  async function getdata(value) {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=&q=London&days=3&aqi=no&alerts=no`
    );
    const result = await data.json();
    setwheatherdata(result.forecast.forecastday);
    console.log(result.forecast.forecastday);
  }
  return (
    <div>
      <div className="search">
        <input type="text" placeholder="Search a city..." onChange={citytext} />
        <button onClick={() => getdata(cityinput)}>Search</button>
      </div>
      {wheatherdata.map((item) => (
        <Wheatherresult
          key={item.date}
          data={item.data}
          mintemp={item.day.mintemp_c}
          maxtemp={item.day.maxtemp_c}
          condition={item.day.condition.text}
          icon={item.day.condition.icon}
        />
      ))}
    </div>
  );
}

export default App;
