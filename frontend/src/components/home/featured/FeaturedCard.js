import React, { useEffect, useState } from "react";
import { featured } from "../../data/Data";

import axios from "axios";
import { Link } from "react-router-dom";
const FeaturedCard = () => {
  const [familyHouse, setfamilyHouse] = useState([]);
  const [houseVilla, setHouseVilla] = useState([]);
  const [apartment, setApartment] = useState([]);
  const [officeStudio, setOfficeStudio] = useState([]);
  const [villaCondo, setvillaCondo] = useState([]);
  useEffect(() => {
    async function getProperties() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/all-properties",
          config
        );

        const familyH = results.data.property.filter(
          (item) => item.type === "Family House"
        );
        setfamilyHouse(familyH);
        const houseV = results.data.property.filter(
          (item) => item.type === "House & Villa"
        );
        setHouseVilla(houseV);

        const appart = results.data.property.filter(
          (item) => item.type === "Apartment"
        );
        setApartment(appart);
        const office = results.data.property.filter(
          (item) => item.type === "Office & Studio"
        );
        setOfficeStudio(office);

        const villa = results.data.property.filter(
          (item) => item.type === "Villa & Condo"
        );
        setvillaCondo(villa);
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, []);
  return (
    <>
      <div className="content grid5 mtop">
        <Link to="/properties/family-house">
          <div className="box">
            <img src="../images/hero/h1.png" alt="" />
            <h4>Family House</h4>
            <label>{familyHouse.length} Property</label>
          </div>
        </Link>
        <Link to="/properties/house-&-villa">
          <div className="box">
            <img src="../images/hero/h2.png" alt="" />
            <h4>House & Villa</h4>
            <label>{houseVilla.length} Property</label>
          </div>
        </Link>
        <Link to="/properties/apartment">
          <div className="box">
            <img src="../images/hero/h3.png" alt="" />
            <h4>Apartment</h4>
            <label>{apartment.length} Property</label>
          </div>
        </Link>
        <Link to="/properties/office-&-studio">
          <div className="box">
            <img src="../images/hero/h4.png" alt="" />
            <h4>Office & Studio</h4>
            <label>{officeStudio.length} Property</label>
          </div>
        </Link>
        <Link to="/properties/villa-&-condo">
          <div className="box">
            <img src="../images/hero/h6.png" alt="" />
            <h4>Villa & Condo</h4>
            <label>{villaCondo.length} Property</label>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FeaturedCard;
