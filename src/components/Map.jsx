import React from "react";
import GoogleMapReact from "google-map-react";
import { MDBIcon } from "mdb-react-ui-kit";

const AnyReactComponent = () => (
  <MDBIcon className="fs-3 text-danger" fas icon="map-marker-alt" />
);

export default function SimpleMap({ lat, lng }) {
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "40vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA8yin2m5utSLVbgSYNZ_pcopSbP4Xvu2U" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}
