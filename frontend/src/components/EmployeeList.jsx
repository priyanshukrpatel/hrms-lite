import React from "react";
import "./EmployeeList.css"; 

function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p style={{ textAlign: "center" }}>No employees found.</p>;
  }

  return (
    <div className="employee-list-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.employee_code}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(emp.employee_code)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;