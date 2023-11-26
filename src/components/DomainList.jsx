import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/domain.css'
const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the list of domains when the component mounts
    fetch('http://localhost:8080/api/v1/domain')
      .then(response => response.json())
      .then(data => setDomains(data))
      .catch(error => console.error('Error fetching domains:', error));
  }, []);

  const handleDomainChange = async (event) => {
    const domainId = event.target.value;
    setSelectedDomain(domainId);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/byDomain/${domainId}`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

return (
    <div>
      <h1>ACADEMIA</h1>
      <div class="center-container ">
      <label htmlFor="domainDropdown">Select a Domain: </label>
      <select id="domainDropdown" onChange={(e) => handleDomainChange(e)}>
        <option value="">Select a domain</option>
        {domains.map(domain => (
          <option key={domain.id} value={domain.id}>{domain.program}</option>
        ))}
        
      </select>
      </div>

      {selectedDomain && (
        <div>
          <h2>COURSE TIME TABLE</h2>
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Faculty Name</th>
                <th>Faculty Email</th>
                <th>Day</th>
                <th>Time</th>
                <th>Room</th>
                <th>Students</th>
                
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.faculty && course.faculty.f_name}</td>
                  <td>{course.faculty && course.faculty.f_email}</td>
                  <td>{course.schedule && course.schedule.day}</td>
                  <td>{course.schedule && course.schedule.time}</td>
                  <td>{course.schedule && course.schedule.room}</td>
                  <td>
                    <button>
                      <Link to={`/courses/${course.id}/students`}>View Students</Link>
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DomainList;
