import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoidGF1c2VlZmd1bHphciIsImEiOiJjbDYyang3aWEwYzk1M2RtdjF5YjNnb3F4In0.R7vbWRTi7yvujhcrJrFXGw";
function MapBox({ data, latitude, longitude }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(73.038078);
  const [lat, setLat] = useState(33.601921);
  const [zoom, setZoom] = useState(9);
  // eslint-disable-next-line no-unused-expressions
  useEffect(() => {
    async function runMap() {
      data !== null &&
        data !== undefined &&
        data !== "" &&
        setLat(data.latitude);
      data !== null &&
        data !== undefined &&
        data !== "" &&
        setLng(data.longitude);
      console.log(lat, lng);
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });
    }
    runMap();
  })
    [data];
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <div>
      <div className="sidebar__map">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default MapBox;
