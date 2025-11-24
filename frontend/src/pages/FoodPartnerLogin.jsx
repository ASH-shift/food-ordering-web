import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.elements['fp-login-email'].value;
  const password = e.target.elements['fp-login-password'].value;

  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/foodpartner/login',
      { email, password },
      { withCredentials: true }
    );

    console.log('Logged in:', res.data);

   const id = res.data.foodPartner.id;
  // <-- GET ID

    alert('Login successful!');
    navigate(`/foodpartner/${id}`);       // <-- FIXED !!!

  } catch (error) {
    console.error('Error:', error.response?.data || error);
    alert('Login failed!');
  }
};


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Food Partner Sign in</h2>

        <div className="auth-switch">
          <Link to="/user/register">Register as user</Link>
          <Link to="/foodpartner/register" className="primary">Register as food partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} aria-label="Food partner login form">
          <label htmlFor="fp-login-email">Email</label>
          <input id="fp-login-email" type="email" placeholder="you@business.com" required />

          <label htmlFor="fp-login-password">Password</label>
          <input id="fp-login-password" type="password" placeholder="Your password" required />

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="auth-note">
          Need an account? <Link to="/foodpartner/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
