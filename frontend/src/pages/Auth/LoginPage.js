import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import api from '../../utils/api';
import '../../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      const { username: loggedInUsername } = response.data;
  
      // Save the username in localStorage or global state
      localStorage.setItem('username', loggedInUsername);
  
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage('Invalid username or password');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <img
          src="/images/logo.png" // Replace with your logo path
          alt="Moringa Logo"
          className="login-logo"
        />
        <h1 className="login-title">Moringa Pair</h1>
        <p className="welcome-text">
          Welcome Back 👋 <br />
          Today is a new day. It's your day. You shape it. Sign in to start managing your HR workflow.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="register-link">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      <div className="login-image">
        <img
          src="/images/login-background.jpg" // Replace with your background image path
          alt="People working together"
        />
      </div>
    </div>
  );
}

export default LoginPage;
