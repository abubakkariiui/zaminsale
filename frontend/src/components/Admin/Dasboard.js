import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Heading from "../common/Heading";
import Sidebar from "../Navbar/Sidebar";
import { useNavigate } from "react-router-dom";

const Dasboard = () => {
  const [values, setValues] = useState([]);
  //   /all-properties
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage?.getItem("user");
    if (JSON.parse(auth)?.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);
  // useEffect(() => {
  //   window.location.reload();
  // }, []);
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
  return (
    <div className="dashboard__container">
      <Sidebar />

      <section className="recent padding">
        <div className="container">
          {/* <RecentCard data={data} /> */}
          <div className="content grid3 mtop">
            {values?.map((item) => (
              <Link
                to={`/view-property-admin/${item.pName.split(" ").join("-")}`}
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dasboard;
