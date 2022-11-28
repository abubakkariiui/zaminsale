import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [err, setErr] = useState({});
  const { email } = formData;

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
        const result = await axios.post(
          "http://localhost:5000/api/auth/forget-password",
          formData,
          config
        );
        // localStorage.setItem("token", JSON.stringify(results.data.token));
        // localStorage.setItem("user", JSON.stringify(results.data.data));
        // if (results.data.data.role === "admin") {
        //   navigate("/dashboard");
        //   window.location.reload();
        // } else {
        // }
        navigate("/reset-password", { state: result.data });
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

    return error;
  };
  return (
    <div className="login">
      <h1>Forget Password</h1>
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

      <button onClick={(e) => onSubmit(e)} className="appButton" type="button">
        Continue
      </button>
    </div>
  );
};

export default ForgetPassword;
