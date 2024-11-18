import React from 'react';

function Greeting({ userName }) {
  const currentDate = new Date().toLocaleString();

  return (
    <div>
      <h2>Good Morning, {userName}</h2>
      <p>{currentDate}</p>
    </div>
  );
}

export default Greeting;
