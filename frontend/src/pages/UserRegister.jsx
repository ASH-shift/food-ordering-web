import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import API from "../utils/api";


const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.elements["user-name"].value;
    const email = e.target.elements["user-email"].value;
    const password = e.target.elements["user-password"].value;

    console.log("Sending Data →", {
      fullName: name,
      email,
      password
    });

    try {
      const res = await API.post("/api/auth/user/register",
        {
          fullName: name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Server Response →", res.data);

      alert("User registered successfully!");
      navigate("/");

    } catch (error) {
      console.log("Full Error →", error);
      console.log("Backend Error →", error.response?.data);

      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input id="user-name" type="text" required />

          <label>Email</label>
          <input id="user-email" type="email" required />

          <label>Password</label>
          <input id="user-password" type="password" required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
