import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.elements["user-name"].value;
    const email = e.target.elements["user-email"].value;
    const password = e.target.elements["user-password"].value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: name,   // ✅ matches backend: registerUser expects fullName
          email,
          password,
        },{
          withCredentials: true,
        });

      console.log("Saved:", res.data);
      alert("User registered successfully!");
      navigate("/");   // or "/user/login" if you prefer

    } catch (error) {
      console.error("Error:", error.response?.data || error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create account</h2>

        <div className="auth-switch">
          <Link to="/user/register" className="primary">Register as user</Link>
          <Link to="/foodpartner/register">Register as food partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="user-name">Full name</label>
          <input id="user-name" type="text" placeholder="Your full name" required />

          <label htmlFor="user-email">Email</label>
          <input id="user-email" type="email" placeholder="you@example.com" required />

          <label htmlFor="user-password">Password</label>
          <input id="user-password" type="password" placeholder="Create password" required />

          <button type="submit" className="btn-primary">Register</button>
        </form>

        <p className="auth-note">
          Already have an account? <Link to="/user/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
