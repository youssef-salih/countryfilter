import React, { useEffect, useRef, useState } from "react";
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
import Meteo from "./Meteo";

export default function Card({ listeColorRegion, namePaysProps }) {
  let { name } = useParams();
  name = name ? name : namePaysProps;
  const [country, setCountry] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const handleImageClick = () => {
    isImageClicked ? setIsImageClicked(false) : setIsImageClicked(true);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        console.log(res.data);
        setCountry(res.data[0]);
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
            <div className="position-relative">
              <SimpleMap
                lat={country.capitalInfo.latlng[0]}
                lng={country.capitalInfo.latlng[1]}
              />
              <MDBCardImage
                className={`position-absolute top-0 ${
                  isImageClicked ? "d-none" : ""
                }`}
                style={{ height: "40vh" }}
                position="top"
                src={country.flags.png}
                alt={country.flags.alt}
                onClick={handleImageClick}
              />
            </div>

            <MDBCardBody className="">
              <MDBCardTitle className="d-flex justify-content-between">
                {country.name.common}
                {isImageClicked ? (
                  <img
                    src={country.flags.png}
                    width={50}
                    onClick={handleImageClick}
                  />
                ) : (
                  ""
                )}
              </MDBCardTitle>
              <MDBCardText>{country.name.official}</MDBCardText>
              <MDBCardText className="d-flex">
                {listeColorRegion ? (
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
                ) : (
                  ""
                )}
              </MDBCardText>

              {country && country.borders && country.borders.length > 0 ? (
                <ul>
                  {country.borders.map((codep) => (
                    <li key={codep}>
                      <NavLink to={`/paycode/${codep}`}>{codep}</NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No border countries found.</p>
              )}

              <Meteo isLoading={isLoading} setIsLoading={setIsLoading} />
            </MDBCardBody>
          </MDBCard>
        </div>
      ) : (
        <p>No data found for the specified country.</p>
      )}
    </>
  );
}
