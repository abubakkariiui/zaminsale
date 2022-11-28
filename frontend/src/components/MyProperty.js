import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from "react-router-dom";
import Heading from "./common/Heading";
// import img from "../images/pricing.jpg";

function MyProperty() {
  const [values, setValues] = useState([]);
  const [msg, setMsg] = useState("Loading...");
  // eslint-disable-next-line no-unused-vars, no-restricted-globals
  const { search } = location;
  //   /all-properties
  useEffect(() => {
    async function getProperties() {
      try {
        const id = JSON.parse(localStorage.getItem("user")).id;
        console.log(id);
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/my-properties",
          { id },
          config
        );
        console.log(results.data);
        setValues(results.data.property);
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setMsg("You have Zero Properties");
    }, 1000);
  }, []);

  return (
    <div className="container">
      <section className="recent padding">
        <div className="container">
          <Heading
            title="My Properties"
            subtitle="Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            // cover={img}
          />
          <div className="content grid3 mtop">
            {values.length > 0 ? (
              values?.map((item) => (
                <Link
                  to={`/show-property/${item.pName.split(" ").join("-")}`}
                  key={item._id}
                >
                  <div className="box shadow" key={item.id}>
                    <div className="img">
                      <img src={item.cover} alt="" />
                    </div>
                    <div className="text">
                      <div className="category flex">
                        <span
                          style={{
                            background:
                              item.category === "For Rent"
                                ? "#25b5791a"
                                : "#ff98001a",
                            color:
                              item.category === "For Rent"
                                ? "#25b579"
                                : "#ff9800",
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h4>{item.pName}</h4>
                      <p>
                        <i icon="fa-solid fa-location-dot" /> {item.location}
                      </p>
                    </div>
                    <div className="button flex">
                      <div>
                        <button className="btn2">{item.price}</button>
                      </div>
                      {/* <span>{capitalize(type)}</span> */}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="heading">
                <p style={{ color: msg === "Loading..." ? "black" : "red" }}>
                  {msg}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyProperty;
