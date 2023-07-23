import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBadge,
} from "mdb-react-ui-kit";
import vite from "../assets/react.svg";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [regions, setRegions] = useState([]);

  const removeDuplicates = (list) => {
    const uniqueSet = new Set(list.map((region) => region.region));
    const uniqueList = [...uniqueSet];
    const uniqueRegions = uniqueList.map((regionName) =>
      list.find((region) => region.region === regionName)
    );
    return uniqueRegions;
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=region")
      .then((res) => {
        const regionsData = res.data;
        const filteredRegions = removeDuplicates(regionsData);
        const regionValues = filteredRegions.map((region) => region.region);
        setRegions(regionValues);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <NavLink to="/">
            <img src={vite} alt="react" />
          </NavLink>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    {"region"}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="">
                    {regions
                      ? regions.map((cont) => (
                          <MDBDropdownItem
                            key={cont}
                            className="text-center p-2"
                          >
                            <NavLink to={`/regions/${cont}`}> {cont}</NavLink>
                          </MDBDropdownItem>
                        ))
                      : ""}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Type query"
                aria-label="Search"
              />
              <MDBBtn color="primary">Search</MDBBtn>
            </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
