import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HistoryPage.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch the history for the logged-in user
  useEffect(() => {
    const fetchHistory = () => {
      const savedHistory = JSON.parse(localStorage.getItem('pairingHistory')) || [];
      setHistory(savedHistory);
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h1 className="history-title">Pairing History</h1>

      <div className="all-history">
        <h2>All Pairing History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((pair, index) => (
              <li key={index}>
                {pair.student1} & {pair.student2}
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
