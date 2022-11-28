import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({});
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    const error = validation(formData);
    setErr(error);
    if (Object.keys(error).length === 0) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/admin/login",
          formData,
          config
        );
        localStorage.setItem("admin-token", JSON.stringify(results.data.token));
        localStorage.setItem("admin", JSON.stringify(results.data.data));
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.response.data.errors[0].msg);
      }
    }
  };
  const validation = (value) => {
    const error = {};
    var regularExpressionEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.email) {
      error.email = "email is required!!!";
    } else if (!regularExpressionEmail.test(value.email)) {
      error.email = "You have entered an invalid email address!";
    }
    if (!value.password) {
      error.password = "password is required!!!";
    }
    return error;
  };
  return (
    <div className="login">
      <h1>Admin Login </h1>
      <ToastContainer />

      <div>
        <input
          type="text"
          className={`inputBox ${err.password && "reg__outline"}`}
          placeholder="Enter Email"
          name="email"
          onChange={(e) => onChange(e)}
          value={email}
        />
        <span className="reg__err">{err.email}</span>
      </div>
      <div>
        <input
          type="password"
          className={`inputBox ${err.password && "reg__outline"}`}
          placeholder="Enter Password"
          name="password"
          onChange={(e) => onChange(e)}
          value={password}
        />
        <span className="reg__err">{err.password}</span>
      </div>
      <button onClick={(e) => onSubmit(e)} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
