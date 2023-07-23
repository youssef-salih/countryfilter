import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Meteo = ({ isLoading, setIsLoading }) => {
  let { name } = useParams();
  const [weather, setWeather] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=d35523a118ed4a538b6111306232007&q=${name}&aqi=no`
      )
      .then((res) => {
        setWeather(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [name]);
  return (
    <>
      {weather ? (
        <div>
          <h3>Weather Information</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>Humidity: {weather.current.humidity}%</p>
        </div>
      ) : (
        <p>No weather information available.</p>
      )}
    </>
  );
};

export default Meteo;
