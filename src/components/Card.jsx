import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBSpinner,
  MDBBadge,
} from "mdb-react-ui-kit";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SimpleMap from "./Map";

export default function Card({ listeColorRegion }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        setCountry(res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [name]);

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
      {isLoading ? (
        <MDBSpinner grow>
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      ) : country ? (
        <div key={country.name.common}>
          <MDBCard className="mb-3 w-50 mx-auto mt-4">
            <SimpleMap
              lat={country.capitalInfo.latlng[0]}
              lng={country.capitalInfo.latlng[1]}
            />
            <MDBCardImage
              className=""
              position="top"
              src={country.flags.png}
              alt={country.flags.alt}
            />

            <MDBCardBody className="">
              <MDBCardTitle>{country.name.common}</MDBCardTitle>
              <MDBCardText>{country.name.official}</MDBCardText>
              <MDBCardText>
                <MDBBadge
                  pill
                  light
                  color={
                    listeColorRegion.find(
                      (elemRegion) => elemRegion.region === country.region
                    )?.color
                  }
                >
                  {country.region}
                </MDBBadge>
              </MDBCardText>

              <ul>
                {country.borders.map((codep) => (
                  <li key={codep}>
                    <NavLink to={`/paycode/${codep}`}>{codep}</NavLink>
                  </li>
                ))}
              </ul>

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
            </MDBCardBody>
          </MDBCard>
        </div>
      ) : (
        <p>No data found for the specified country.</p>
      )}
    </>
  );
}
