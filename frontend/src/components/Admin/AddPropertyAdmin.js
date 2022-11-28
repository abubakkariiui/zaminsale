import React, { useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Navbar/Sidebar";

function AddPropertyAdmin() {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pName: "",
    location: "",
    city: "",
    price: "",
    type: "",
    longitude: "",
    latitude: "",
    category: "",
    priceRange: "",
    specification: "",
  });
  const [cover, setFile] = useState("");
  const [err, setErr] = useState({});
  const {
    pName,
    location,
    city,
    price,
    type,
    longitude,
    latitude,
    category,
    priceRange,
    specification,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    const error = validation(formData);
    setErr(error);
    if (Object.keys(error).length === 0) {
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        };
        const data = {
          pName,
          cover,
          location,
          city,
          price,
          type,
          longitude,
          latitude,
          category,
          priceRange,
          specification,
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/create-post",
          data,
          config
        );
        console.log(results.data);
        toast.success("Property Added Successfully");
        // localStorage.setItem("user", JSON.stringify(results.data.token));
        // navigate("/login");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.errors[0].msg);
      }
    }
  };
  const validation = (value) => {
    const error = {};

    if (!value.pName) {
      error.pName = "property name is required!!!";
    }
    // if (!value.cover) {
    //   error.cover = "Image is required!!!";
    // }
    if (!value.location) {
      error.location = "location is required!!!";
    }
    if (!value.city) {
      error.city = "city is required!!!";
    }
    if (!value.price) {
      error.price = "price is required!!!";
    }
    if (!value.type) {
      error.type = "Property type is required!!!";
    }
    if (!value.latitude) {
      error.latitude = "latitude is required!!!";
    }
    if (!value.longitude) {
      error.longitude = "longitude is required!!!";
    }
    if (!value.category) {
      error.category = "Category is required!!!";
    }
    if (!value.priceRange) {
      error.priceRange = "Price Range is required!!!";
    }
    if (!value.specification) {
      error.specification = "Specification is required!!!";
    }
    return error;
  };

  const uploadImage = async (e) => {
    // setFile(e.target.files[0]);

    const data = new FormData();
    data.append("img", e.target.files[0]);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          //   "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/property/upload-photo",
        data,
        config
      );
      setFile(res.data);

      //   setUrl(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="dashboard__container">
      <Sidebar />
      <div className="recent register">
        <ToastContainer />
        <h1>Add Property</h1>
        {/* <label>Name</label> */}
        <div>
          <input
            className={`inputBox ${err.pName && "reg__outline"}`}
            type="text"
            name="pName"
            value={pName}
            onChange={(e) => onChange(e)}
            placeholder="Enter title"
          />
          <span className="reg__err">{err.pName}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.cover && "reg__outline"}`}
            type="file"
            name="cover"
            //   value={file}
            onChange={(e) => uploadImage(e)}
            placeholder="Add image url"
          />
          <span className="reg__err">{err.cover}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.location && "reg__outline"}`}
            type="text"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
            placeholder="Enter location"
          />
          <span className="reg__err">{err.location}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.city && "reg__outline"}`}
            type="text"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
            placeholder="Enter city"
          />
          <span className="reg__err">{err.city}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.city && "reg__outline"}`}
            type="text"
            name="latitude"
            value={latitude}
            onChange={(e) => onChange(e)}
            placeholder="Enter Latitude"
          />
          <span className="reg__err">{err.latitude}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.city && "reg__outline"}`}
            type="text"
            name="longitude"
            value={longitude}
            onChange={(e) => onChange(e)}
            placeholder="Enter Longitude"
          />
          <span className="reg__err">{err.longitude}</span>
        </div>
        <div>
          <select
            name="category"
            onChange={(e) => onChange(e)}
            className={`inputBox ${err.category && "reg__outline"}`}
          >
            <option>Please Select category</option>
            <option name="category" value="For Rent">
              For Rent
            </option>
            <option name="category" value="For Sale">
              For Sale
            </option>
            <option name="category" value="Sold">
              Sold
            </option>
          </select>
          <span className="reg__err">{err.category}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.price && "reg__outline"}`}
            type="text"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
            placeholder="Enter price"
          />
          <span className="reg__err">{err.price}</span>
        </div>
        <div>
          <input
            className={`inputBox ${err.price && "reg__outline"}`}
            type="number"
            name="priceRange"
            value={priceRange}
            onChange={(e) => onChange(e)}
            placeholder="Enter price in Digits"
          />
          <span className="reg__err">{err.priceRange}</span>
        </div>
        <div>
          <div>
            <input
              className={`inputBox ${err.price && "reg__outline"}`}
              type="type"
              name="specification"
              value={specification}
              onChange={(e) => onChange(e)}
              placeholder="Enter Specification"
            />
            <span className="reg__err">{err.specification}</span>
          </div>
          <div>
            <select
              name="type"
              onChange={(e) => onChange(e)}
              className={`inputBox ${err.type && "reg__outline"}`}
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
            <span className="reg__err">{err.type}</span>
          </div>
          <button
            type="submit"
            className="appButton"
            onClick={(e) => onSubmit(e)}
          >
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPropertyAdmin;
