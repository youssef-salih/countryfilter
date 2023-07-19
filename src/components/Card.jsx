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
import { useParams } from "react-router-dom";
import axios from "axios";


export default function Card({ listeColorRegion }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          <MDBCard className="mb-3 w-75 mx-auto mt-4">
            <MDBCardImage
              position="top"
              src={country.flags.png}
              alt={country.flags.alt}
            />
            <MDBCardBody>
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
       
            </MDBCardBody>
          </MDBCard>
        </div>
      ) : (
        <p>No data found for the specified country.</p>
      )}
    </>
  );
}
