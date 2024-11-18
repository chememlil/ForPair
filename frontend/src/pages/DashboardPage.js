import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [pairs, setPairs] = useState([]); // Store fetched pairs
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username') || 'Guest';
    setUserName(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handlePair = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/pair', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setPairs(data.pairs); // Update the pair state
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
        {pairs.length > 0 ? (
          <div className="pair-results">
            <h3>Pair Results:</h3>
            <ul>
              {pairs.map((pair, index) => (
                <li key={index}>
                  {pair.student1} & {pair.student2}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No pair yet</p>
        )}
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
