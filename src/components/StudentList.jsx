// StudentList.js
import '../Styles/StudentList.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentList = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students for the specific course using courseId
    fetch(`http://localhost:8080/api/courses/${courseId}/students`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, [courseId]);

  return (
    <div>
      <h1>Students in Course {courseId}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.rno}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default StudentList;
