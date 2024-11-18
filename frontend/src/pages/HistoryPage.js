import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HistoryPage.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Helper function for ISO week number
  const getISOWeek = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 3 - ((currentDate.getDay() + 6) % 7));
    const firstThursday = currentDate.valueOf();
    currentDate.setMonth(0, 1);
    if (currentDate.getDay() !== 4) {
      currentDate.setMonth(0, 1 + ((4 - currentDate.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - currentDate) / 604800000);
  };

  // Fetch the history for the logged-in user
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username') || 'Guest';

    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/history?user=${loggedInUser}`);
        if (response.ok) {
          const data = await response.json();
          setHistory(data.history || []);
        } else {
          console.error('Failed to fetch history:', response.statusText);
        }
      } catch (error) {
        console.error('Error while fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h1 className="history-title">Pairing History</h1>

      <div className="current-week-pairs">
        <h2>Current Week Pairs</h2>
        {history.length > 0 ? (
          <ul>
            {history
              .filter((pair) => pair.week_number === getISOWeek(new Date()))
              .map((pair) => (
                <li key={pair.id}>
                  {pair.student1_name} & {pair.student2_name} (Week {pair.week_number})
                </li>
              ))}
          </ul>
        ) : (
          <p>No pairs available for the current week.</p>
        )}
      </div>

      <div className="all-history">
        <h2>All Pairing History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((pair) => (
              <li key={pair.id}>
                {pair.student1_name} & {pair.student2_name} (Week {pair.week_number})
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
      </div>

      <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default HistoryPage;
