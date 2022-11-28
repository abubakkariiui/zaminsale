import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    password: "",
    cPassword: "",
  });
  const [err, setErr] = useState({});
  const { password, cPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    const error = validation(formData);
    setErr(error);
    if (Object.keys(error).length === 0) {
      try {
        const data = {
          email: state.email,
          password: password,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.put(
          "http://localhost:5000/api/auth/new-password",
          data,
          config
        );
        toast.success(results.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        toast.error(err.response.data.errors[0].msg);
      }
    }
  };
  const validation = (value) => {
    const error = {};
    var regularExpressionPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!value.password) {
      error.password = "password is required!!!";
    } else if (password !== cPassword) {
      error.password = "password mismatch !!!";
    } else if (!regularExpressionPassword.test(value.password)) {
      error.password =
        "password should contain atleast one number and one special character";
    }
    return error;
  };
  return (
    <div className="login">
      <h1>Reset Password </h1>
      <ToastContainer />

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
      <div>
        <input
          type="password"
          className={`inputBox ${err.password && "reg__outline"}`}
          placeholder="Confirm Password"
          name="cPassword"
          onChange={(e) => onChange(e)}
          value={cPassword}
        />
      </div>

      <button onClick={(e) => onSubmit(e)} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default NewPassword;
