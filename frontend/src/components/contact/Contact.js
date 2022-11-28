import React, { useRef } from "react";
import img from "../images/zaminsale.jpg";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  const ref = useRef(null);
  const handleClick = () => {
    console.log("first");
    console.log(ref.current);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <section className="contact mb">
        <Back
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img}
        />
        <div className="container" ref={ref}>
          <form className="">
            <h4 className="contact__heading">
              Fillup The Form <br />{" "}
            </h4>

            <div className="">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
            </div>
            <input type="text" placeholder="Subject" />

            <textarea cols="10" rows="10"></textarea>
            <button>Submit Request</button>
          </form>
        </div>
      </section>
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className="btn5" onClick={handleClick}>
              Contact Us Today
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
