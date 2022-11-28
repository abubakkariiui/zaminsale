import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Heading from "./components/common/Heading";

function Search() {
  const location = useLocation();
  const [values, setValues] = useState([]);
  const { search } = location;
  //   /all-properties
  useEffect(() => {
    async function getProperties() {
      try {
        let city = capitalize(search?.split("@")[0]?.split("=")[1]);
        let type = capitalize(search?.split("@")[1]?.split("=")[1]);
        let price = search.split("@")[2].split("=")[1];

        const body = { city, type, price };
        console.log(body);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/range-properties",
          body,
          config
        );
        console.log(results.data);
        setValues(results.data.property);
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, [search]);
  function capitalize(str) {
    let results = [];
    str.split("-").forEach((element) => {
      results.push(
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
      );
    });
    return results.join(" ");
  }
  return (
    <div className="container">
      <section className="recent padding">
        <div className="container">
          <Heading
            title="Search Results"
            subtitle="Lorem ipsum dolor sit amet, consectetur  adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          {/* <RecentCard data={data} /> */}
          <div className="content grid3 mtop">
            {values?.map((item) => (
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
                      {/* <span
                    style={{
                      background:
                        category === "For Rent" ? "#25b5791a" : "#ff98001a",
                      color: category === "For Rent" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {category}
                  </span> */}
                      <i className="fa fa-heart"></i>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;
