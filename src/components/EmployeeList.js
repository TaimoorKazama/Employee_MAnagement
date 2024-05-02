import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting employee with ID:', id);
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchData(); // Refresh employee list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/employees/${selectedEmployee._id}`, formData);
      setSelectedEmployee(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: ''
      });
      fetchData(); // Refresh employee list after update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Employee List</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {employees.map((employee) => (
          <li key={employee._id} style={{ marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', border: '1px solid #ccc', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <strong>Name:</strong> {employee.name}
            </div>
            <div>
              <strong>Email:</strong> {employee.email}
            </div>
            <div>
              <strong>Phone:</strong> {employee.phone}
            </div>
            <div>
              <strong>Position:</strong> {employee.position}
            </div>
            <div>
              <button onClick={() => handleEdit(employee)} style={{ padding: '5px 10px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(employee._id)} style={{ marginLeft: '5px', padding: '5px 10px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedEmployee && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
        </form>
      )}
    </div>
  );
};

export default EmployeeList;
