import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const RecentCard = () => {
  const [values, setValues] = useState([]);
  //   /all-properties
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
        setValues(results.data.property);
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, []);
  function capitalize(str) {
    let results = [];
    str.split("-").forEach((element) => {
      results.push(
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
      );
    });
    return results.join(" ");
  }
  function trucncate(str, size) {
    if (str.length > size) {
      return str.slice(0, 30) + "..."
    } else {
      return str
    }
  }
  return (
    <>
      <div className="content grid3 mtop">
        {values.map((item, index) => (
          <Link
            to={`/show-property/${item.pName.split(" ").join("-")}`}
            key={item._id}
          >
            <div className="box shadow">
              <div className="img">
                <img src={item.cover} alt="" />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                        item?.category === "For Rent"
                          ? "#25b5791a"
                          : "#ff98001a",
                      color:
                        item?.category === "For Rent" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {item?.category}
                  </span>
                </div>
                <h4>{trucncate(item.pName, 30)}</h4>
                <p>
                  <i icon="fa-solid fa-location-dot" /> {trucncate(item.location, 30)}
                </p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">{item.price}</button>
                </div>
                <span>{capitalize(item.type)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecentCard;
