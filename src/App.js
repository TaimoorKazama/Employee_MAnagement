import React from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './components/styles.css'


function App() {
  return (
    <div className="App container">
      <div className="form-container">
        <EmployeeForm />
      </div>
      <div className="employee-list">
        <EmployeeList />
      </div>
    </div>
  );
}

export default App;
