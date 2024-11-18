import React, { useState } from 'react';
import StudentList from '../components/StudentManagement/StudentList';
import AddStudent from '../components/StudentManagement/AddStudent';


function StudentManagementPage() {
  const [students, setStudents] = useState([]);

  const addStudent = (name) => {
    setStudents([...students, { id: students.length + 1, name }]);
  };

  return (
    <div>
      <h1>Student Management</h1>
      <AddStudent onAddStudent={addStudent} />
      <StudentList students={students} />
    </div>
  );
}

export default StudentManagementPage;
