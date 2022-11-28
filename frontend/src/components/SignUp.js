import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
    role: "user",
  });
  const [err, setErr] = useState({});
  const { fname, email, password } = formData;

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
          "http://localhost:5000/api/user/register",
          formData,
          config
        );
        console.log(results.data);
        // localStorage.setItem("user", JSON.stringify(results.data.token));
        navigate("/login");
      } catch (err) {
        toast.error(err.response.data.errors[0].msg);
      }
    }
  };
  const validation = (value) => {
    const error = {};
    var regularExpressionPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var regularExpressionEmail =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.fname) {
      error.fname = "name is required!!!";
    }
    if (!value.email) {
      error.email = "email is required!!!";
    } else if (!regularExpressionEmail.test(value.email)) {
      error.email = "You have entered an invalid email address!";
    }
    if (!value.password) {
      error.password = "password is required!!!";
    } else if (!regularExpressionPassword.test(value.password)) {
      error.password =
        "password should contain atleast one number and one special character";
    }
    return error;
  };
  return (
    <div className="register">
      <ToastContainer />
      <h1>Register</h1>
      <div>
        <input
          className={`inputBox ${err.fname && "reg__outline"}`}
          type="text"
          name="fname"
          value={fname}
          onChange={(e) => onChange(e)}
          placeholder="Enter Name"
        />
        <span className="reg__err">{err.fname}</span>
      </div>

      <div>
        <input
          className={`inputBox ${err.email && "reg__outline"}`}
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="Enter Email"
        />
        <span className="reg__err">{err.email}</span>
      </div>

      <div>
        <input
          className={`inputBox ${err.password && "reg__outline"}`}
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          placeholder="Enter Password"
        />
        <span className="reg__err">{err.password}</span>
      </div>
      <button onClick={(e) => onSubmit(e)} className="appButton" type="submit">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
