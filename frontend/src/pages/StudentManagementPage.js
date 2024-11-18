import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentManagementPage() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(savedStudents);
  }, []);

  // Save students to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Function to add a student
  const addStudent = (name) => {
    const newStudent = { id: students.length + 1, name };
    setStudents([...students, newStudent]);
  };

  // Function to delete a student by ID
  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <div>
      <h1>Student Management</h1>
      <AddStudent onAddStudent={addStudent} />
      <StudentList students={students} onDeleteStudent={deleteStudent} />
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

function StudentList({ students, onDeleteStudent }) {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name}
          <button
            onClick={() => onDeleteStudent(student.id)}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddStudent({ onAddStudent }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return; // Prevent adding empty names
    onAddStudent(name.trim());
    setName(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginRight: '10px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Student
      </button>
    </form>
  );
}

export default StudentManagementPage;
