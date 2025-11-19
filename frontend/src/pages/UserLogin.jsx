import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const email = e.target.elements['login-email'].value;
    const password = e.target.elements['login-password'].value;

    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Logged in:', res.data);
      alert('Login successful!');
      navigate('/');   // redirect after success

    } catch (error) { 
      console.error('Error:', error.response?.data || error);
      alert('Login failed!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign in</h2>

        <div className="auth-switch">
          <Link to="/user/register" className="primary">Register as user</Link>
          <Link to="/foodpartner/register">Register as food partner</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} aria-label="User login form">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" type="email" placeholder="you@example.com" required />

          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" placeholder="Your password" required />

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="auth-note">
          Don't have an account? <Link to="/user/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
