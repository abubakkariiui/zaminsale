import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoidGF1c2VlZmd1bHphciIsImEiOiJjbDYyang3aWEwYzk1M2RtdjF5YjNnb3F4In0.R7vbWRTi7yvujhcrJrFXGw";
function Detaill() {
  const navigate = useNavigate();

  const [viewPoint, setViewPoint] = useState({
    width: "100%",
    height: "100%",
    longitude: 73.016914,
    latitude: 33.565109,
    zoom: 10,
  });

  const { title } = useParams();
  const [data, setValue] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(73.038078);
  const [lat, setLat] = useState(50.601921);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  //   /all-properties
  useEffect(() => {
    async function getProperties() {
      try {
        let value = title.split("-").join(" ");
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/view-property",
          { value },
          config
        );
        console.log(results.data);

        setValue(results.data.property);

        if (
          results.data.property.latitude !== undefined &&
          results.data.property.longitude !== undefined
        ) {
          setLat(results.data.property.latitude);
          setLng(results.data.property.longitude);
          // console.log(lat, lng);
          memoizedCallback(
            results.data.property.latitude,
            results.data.property.longitude,
            results.data.property.location
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, [title]);

  const deleteNow = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage?.getItem("token")),
          },
        };
        await axios.delete(
          `http://localhost:5000/api/property/delete-property/${id}`,
          config
        );
        toast.success("Property Deleted Successfully, Redirecting...");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vdwv59a",
        "template_2yyvxvk",
        form.current,
        "3rjq6JRRKCMhHve2-"
      )
      .then(
        (result) => {
          toast.success("Email Send");
        },
        (error) => {
          toast.error("Email Not Send");
        }
      );
  };

  const memoizedCallback = useCallback(
    (lt, lg, loc) => {
      console.log(lt, lg);
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lg, lt],
        zoom: 8,
      });
      const marker1 = new mapboxgl.Marker().setLngLat([lg, lt]).addTo(map);
      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([lg, lt])
        .setHTML(loc)
        .addTo(map);
    },
    [lat, lng]
  );
  return (
    <div className="container py-3">
      <ToastContainer />
      <h1>{data?.pName}</h1>
      <p>{data?.location}</p>
      <span
        className="p-1"
        style={{
          background: data?.category === "For Rent" ? "#25b5791a" : "#ff98001a",
          color: data?.category === "For Rent" ? "#25b579" : "#ff9800",
        }}
      >
        {data?.category}
      </span>
      <div className="detail__cardDetail py-2">
        <img src={data?.cover} alt="" className="detail__image m-1" />

        <div className="detail__card m-1">
          <div className="detail__updatedelete__icon">
            <p>PKR {data?.price}</p>
            {data?.user?._id ===
              JSON.parse(localStorage?.getItem("user"))?.id && (
              <div className="detail__auth__icon">
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => deleteNow(data?._id)}
                ></i>{" "}
                <i
                  className="fa-solid fa-pen-nib"
                  onClick={() => {
                    navigate("/update-property", { state: data });
                  }}
                ></i>
              </div>
            )}
          </div>

          <form ref={form} onSubmit={sendEmail}>
            <div>
              <input
                className="inputBox"
                type="text"
                name="user_name"
                placeholder="Enter name"
              />
            </div>
            <div>
              <input
                className="inputBox"
                type="text"
                name="user_email"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <input
                className="inputBox"
                type="text"
                name="user_number"
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <textarea
                className="inputBox"
                id="w3review"
                rows="4"
                cols="50"
                name="message"
              ></textarea>
            </div>
            <button className="detail__buynow" type="submit">
              Send Email
            </button>
            <button
              className="detail__buynow"
              onClick={() => {
                navigate("/pay-now", { state: data });
              }}
            >
              buy Now
            </button>
          </form>
        </div>
      </div>
      <p>{data?.specification}</p>

      <div className="detail__map py-3">
        <h2>Location & Nearby</h2>
        <div style={{ display: "inline", minWidth: "600px", height: "600px" }}>
          {data?.latitude !== undefined && data?.longitude !== undefined && (
            <div id="map"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detaill;
