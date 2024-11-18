import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState(''); // Default is empty
  const [pair, setPair] = useState(''); // To store the pairing result
  const navigate = useNavigate();

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup interval
  }, []);

  // Fetch the username from localStorage on mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username') || 'Guest'; // Replace with your global state logic if necessary
    setUserName(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear the username
    navigate('/');
  };

  const handlePair = async () => {
    try {
      // Fetch random pairs from the backend
      const response = await fetch('http://127.0.0.1:5000/api/pair');
      if (response.ok) {
        const data = await response.json();
        setPair(data.pair || 'No pair available'); // Update the pair state
      } else {
        alert('Failed to fetch pairings.');
      }
    } catch (error) {
      console.error('Error while pairing:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>
          Good {currentTime.getHours() < 12 ? 'Morning' : 'Afternoon'}, {userName}
        </h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-time">
        <h1>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
        <p>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="dashboard-action">
        <button className="pair-button" onClick={handlePair}>
          Tap To Pair
        </button>
        <p>Paired with: <strong>{pair || 'No pair yet'}</strong></p>
      </div>

      <div className="dashboard-footer">
        <button className="history-button" onClick={() => navigate('/history')}>
          History Page
        </button>
        <button className="students-button" onClick={() => navigate('/students')}>
          Students Page
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
