import React, { useState } from "react";
import { MDBBadge, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { NavLink, useParams } from "react-router-dom";
const Corps = ({ listePaysProps, listeColorRegion }) => {
  const { region } = useParams();

  listePaysProps = region
    ? listePaysProps.filter(
        (pay) => pay.region.toLowerCase() === region.toLowerCase()
      )
    : listePaysProps;

  const [listPaysAffiche, setListPaysAffiche] = useState(listePaysProps);
  const [valSearchPays, setValSearchPays] = useState("");

  const searchPays = (event) => {
    setValSearchPays(event.target.value);
    setListPaysAffiche(
      listePaysProps.filter((pays) =>
        pays.name.common
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <h1 className="text-center">
        <NavLink to={`/`}> Liste des pays du monde</NavLink>
      </h1>

      <div className="w-50 mx-auto">
        <input
          type="text"
          value={valSearchPays}
          onChange={(event) => searchPays(event)}
        />
        {listPaysAffiche.map((pays) => (
          <MDBListGroup
            style={{ minWidth: "22rem" }}
            light
            key={pays.name.common}
          >
            <MDBListGroupItem className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <NavLink to={`/card/${pays.name.common}`}>
                  <img
                    src={pays.flags.png}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                </NavLink>
                <div className="ms-3">
                  <NavLink to={`/card/${pays.name.common}`}>
                    <p className="fw-bold mb-1">{pays.name.common}</p>
                  </NavLink>

                  <p className="text-muted mb-0">{pays.capital}</p>
                  <ul className="d-flex">
                    {pays.languages
                      ? Object.values(pays.languages).map((lng) => (
                          <li key={lng} className="ms-3 ">
                            {lng}
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
              <MDBBadge
                pill
                light
                color={
                  listeColorRegion.filter(
                    (elemRegion) => elemRegion.region == pays.region
                  )[0].color
                }
              >
                <NavLink to={`/region/${pays.region}`}>{pays.region}</NavLink>
              </MDBBadge>
            </MDBListGroupItem>
          </MDBListGroup>
        ))}
      </div>
    </>
  );
};

export default Corps;
