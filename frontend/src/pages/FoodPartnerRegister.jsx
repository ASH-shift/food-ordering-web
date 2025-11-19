import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';


const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.elements['fp-business'].value;
    const email = e.target.elements['fp-email'].value;
    const password = e.target.elements['fp-password'].value;

    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/foodpartner/register',
        {
          name: businessName,   // <-- FIXED to match backend
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Saved:', res.data);
      alert('Food partner registered successfully!');
      navigate('/create-food'); // redirect after success

    } catch (error) {
      console.error('Error:', error.response?.data || error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Food Partner Sign up</h2>
        <div className="auth-switch">
          <Link to="/user/register">Register as user</Link>
          <Link to="/foodpartner/register" className="primary">Register as food partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} aria-label="Food partner registration form">
          <label htmlFor="fp-business">Business name</label>
          <input id="fp-business" type="text" placeholder="Business or restaurant name" required />

          <label htmlFor="fp-email">Email</label>
          <input id="fp-email" type="email" placeholder="you@business.com" required />

          <label htmlFor="fp-password">Password</label>
          <input id="fp-password" type="password" placeholder="Create password" required />

          <button type="submit" className="btn-primary">Register</button>
        </form>

        <p className="auth-note">
          Already registered? <Link to="/foodpartner/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
