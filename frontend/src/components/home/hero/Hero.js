import React, { useState } from "react";
import Heading from "../../common/Heading";
import "./hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    type: "",
    
    price: 0,
  });
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState("");
  const { city, type, price } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const onSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formData);
    setErr(errors);
    if (Object.keys(errors).length === 0) {
      navigate(
        `/search?city=${city}@type=${type.split(" ").join("-")}@price=${price}`
      );
    }
  };
  const validation = (value) => {
    const error = {};

    if (!value.city) {
      error.city = "City name is required!!!";
    }

    if (!value.type) {
      error.type = "Property Type is required!!!";
    }

    return error;
  };
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Search Your Next Home "
            subtitle="Find new & featured property located in your local city."
          />

          <form className="flex" onSubmit={(e) => onSubmit(e)}>
            <div className="box">
              <span>City/Street</span>
              <select
                name="city"
                onChange={(e) => onChange(e)}
                className="hero__input"
              >
                <option>Please Select Type</option>
                <option name="city" value="Rawalpindi">
                  Rawalpindi
                </option>
                <option name="city" value="Islamabad">
                  Islamabad
                </option>
              </select>
            </div>
            <div className="box">
              <span>Property Type</span>
              <select
                name="type"
                onChange={(e) => onChange(e)}
                className="hero__input"
              >
                <option>Please Select Type</option>
                <option name="type" value="Family House">
                  Family House
                </option>
                <option name="type" value="House & Villa">
                  House & Villa
                </option>
                <option name="type" value="Apartment">
                  Apartment
                </option>
                <option name="type" value="Office & Studio">
                  Office & Studio
                </option>
                <option name="type" value="Villa & Condo">
                  Villa & Condo
                </option>
              </select>
            </div>
            <div className="box slidecontainer">
              <span>Price: {price}</span>
              <input
                type="range"
                min="10000"
                max="100000"
                name="price"
                value={price}
                class="slider"
                onChange={(e) => onChange(e)}
                // id="myRange"
              />
            </div>

            <div className="search">
              <button className="search__button" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
