import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [pairs, setPairs] = useState([]); // Store pairs
  const [students, setStudents] = useState([]); // Store students
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username') || 'Guest';
    setUserName(loggedInUser);
  }, []);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(savedStudents);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handlePair = () => {
    if (students.length < 2) {
      alert('Not enough students to pair!');
      return;
    }

const shuffledStudents = [...students];
const newPairs = [];

// Ensure the number of students is even (if odd, one student is left out)
if (shuffledStudents.length % 2 !== 0) {
  shuffledStudents.push({ id: 'extra', name: 'Leftover' });
}

// Shuffle the students
shuffledStudents.sort(() => Math.random() - 0.5);

// Create pairs
while (shuffledStudents.length > 1) {
  const student1 = shuffledStudents.pop();
  const student2 = shuffledStudents.pop();
  newPairs.push({ student1: student1.name, student2: student2.name });
}

setPairs(newPairs); // Update the pairs state
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

