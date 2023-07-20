//AIzaSyA8yin2m5utSLVbgSYNZ_pcopSbP4Xvu2U

import "./App.css";
import Corps from "./components/Corps";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import { MDBSpinner } from "mdb-react-ui-kit";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error404";
import Card from "./components/Card";

function App() {
  const [listPays, setListPays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const colorRegions = [
    {
      region: "Europe",
      color: "primary",
    },
    {
      region: "Africa",
      color: "danger",
    },
    {
      region: "Americas",
      color: "secondary",
    },
    {
      region: "Oceania",
      color: "warning",
    },
    {
      region: "Asia",
      color: "success",
    },
    {
      region: "Antarctic",
      color: "info",
    },
  ];
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setListPays(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {isLoading ? (
          <Routes>
            <Route
              path="/"
              element={
                <Corps key="A" listePaysProps={listPays} listeColorRegion={colorRegions} />
              }
            />
            <Route
              path="/region/:region"
              element={
                <Corps
                  key="B"
                  listePaysProps={listPays}
                  listeColorRegion={colorRegions}
                />
              }
            />
            <Route
              path="/card/:name"
              element={<Card listeColorRegion={colorRegions} />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        ) : (
          <MDBSpinner grow>
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        )}
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
