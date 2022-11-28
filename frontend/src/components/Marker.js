import React from "react";
import { Marker } from "react-map-gl";

function Marker({ coordinates }) {
  return (
    <Marker coordinates={currentLocation} anchor="center">
      <div className="pulsating-circle" />;
    </Marker>
  );
}

export default Marker;
