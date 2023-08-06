import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [weather, setWeather] = useState(null); //Empty Object = weather.
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(
        // get to recsive data , Post to return or show data.
        "http://api.weatherapi.com/v1/current.json?key=51951efca9884106ae984217230608&q=London"
      )
      .then((data) => {
        setWeather(data.data); //console.log(data) one of the folowing we have is (data)
        console.log(data.data);
      })
      .catch((err) => console.log(err)); // to catck the error because we fitching data in Outside code.
  }, []);

  // Event
  const weatherInput = (e) => {
    //console.log(e) show us the objects or property like target , value and so on.
    setInput(e.target.value);
  };

  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=51951efca9884106ae984217230608&q=${input}`
      )
      .then((data) => {
        //.then(data) => console.log(data) // to show us the other country data in console.
        setWeather(data.data); // to when we change the query city or country name in API change all informaiotn to that country
      });
  };
  return (
    <div className="App">
      {weather && ( // if Condition
        <div>
          <div className="search">
            <input onChange={weatherInput} type="text" />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.name}</h1>
            <h2>{weather.location.region}</h2>
            <div className="condition">
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="wether icon" />
              <h3>{weather.current.temp_c} Celsius</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

