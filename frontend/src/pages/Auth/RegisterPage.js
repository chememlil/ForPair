import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For the success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Example API request logic
      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.status === 201) {
        setSuccessMessage('You have now registered successfully!');
        setTimeout(() => {
          navigate('/'); // Redirect to login after success
        }, 3000); // Delay navigation to show the success message
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Registration failed. Try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <img
          src="/images/logo.png" // Add the logo file here
          alt="Moringa Logo"
          className="register-logo"
        />
        <h1 className="register-title">Moringa Pair</h1>
        <p className="welcome-text">
          Join Us Today! 👋 <br />
          Sign up to start managing your HR workflow.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}
        <p className="register-link">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
      <div className="register-image">
        <img
          src="/images/register-background.jpg" // Replace with the appropriate background image
          alt="People collaborating"
        />
      </div>
    </div>
  );
}

export default RegisterPage;
