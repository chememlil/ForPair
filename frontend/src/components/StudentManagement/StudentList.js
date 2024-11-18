import React from 'react';

function StudentList({ students }) {
  return (
    <div>
      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
