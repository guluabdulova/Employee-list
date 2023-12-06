import './EmployeeList.css';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EmployeeList.css'; 
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
 fetch('https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood')
    .then(response => {
    if (!response.ok) {
         throw new Error('Şəbəkə cavabı xətası');}
     return response.json();})
      .then(data => setEmployees(data))
      .catch(error => console.error('Datanın alınması xətası:', error));
  }, []);




  const search = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="list-container">
      <input
        type="text"
        placeholder="Search by employee name"
        onChange={search}
        className="search-input"
      />
      <ul className="employee-list">
        {filteredEmployees.map(employee => (
          <li key={employee.id} className="list-item">
            {employee.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default EmployeeList;
