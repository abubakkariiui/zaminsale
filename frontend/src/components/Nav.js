// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assest/logo-light.jpg";
const Nav = () => {
  let auth = localStorage?.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      {JSON.parse(auth)?.role === "user" ? (
        <div className="nav__single">
          <ul className="nav-ul">
            <li>
              <img alt="logo" className="img1" src={logo} width="150" />
            </li>
            <li>
              <Link to="/">Home </Link>
            </li>

            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/add-property">Add Property</Link>
            </li>
            <li>
              <Link to="/my-properties">My Properties</Link>
            </li>
            
            <li>
              <Link to="/aboutus"> About Us</Link>
            </li>
            <li>
              <Link to="/contactus">contact us</Link>
            </li>
          </ul>

          <ul className="nav__logout" style={{ display: "flex" }}>
            {/* <li>
              <i class="fa-solid fa-circle-user"></i> {JSON.parse(auth)?.name}
            </li>{" "} */}
            <li style={{ marginLeft: "10px" }}>
              <Link onClick={logout} to="/signup">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <>
          {JSON.parse(auth)?.role === "admin" ? (
            <div className="nav__single">
              <ul className="nav-ul">
                <li>
                  
                  <img src="../images/logo-light.jpg" alt="admin_logo"
                    className="img1"/>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>

              <ul className="nav__logout">
                <li>
                  <i class="fa-solid fa-circle-user"></i>{" "}
                  {JSON.parse(auth)?.name}
                </li>
                {/* <li>
                  <Link onClick={logout} to="/signup">
                    Logout
                  </Link>
                </li> */}
              </ul>
            </div>
          ) : (
            <ul className="nav-ul nav-right bg">
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              {/* <li>
                <Link to="/admin-login">Admin Login</Link>
              </li> */}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Nav;
