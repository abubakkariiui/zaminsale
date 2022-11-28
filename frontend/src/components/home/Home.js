import React, { useEffect } from "react";
// import Awards from "./awards/Awards";
import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Price from "./price/Price";
import Recent from "./recent/Recent";
import Team from "./team/Team";
import Contact from "../contact/Contact";

// import Footer from "../common/footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage?.getItem("user");
    if (JSON.parse(auth)?.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      {/* <Awards /> */}
      <Location />
      <Team />
      <Price />
      {/* <Footer /> */}
      <Contact />
    </>
  );
};

export default Home;
