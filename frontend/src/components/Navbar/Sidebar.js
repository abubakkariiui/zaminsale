import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  const logout = () => {
    localStorage.clear();
    // eslint-disable-next-line no-undef
    navigate("/login");
  };
  return (
    <div className="container__sidebar bg">
      <div className="sidebar__items">
        <p>
          <i className="fa-solid fa-square-plus"></i>{" "}
          <Link to="/add-propert-admin">Add Property</Link>
        </p>
        <p>
          <i class="fa-solid fa-eye"></i>{" "}
          <Link to="/dashboard">View Property</Link>
        </p>
        <p>
          <i class="fa-solid fa-circle-arrow-right"></i>{" "}
          <Link to="/my-properties">Admin Properties</Link>
        </p>
      </div>
      <div className="sidebar__logout">
        <p>
          <Link onClick={logout} to="/signup">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
