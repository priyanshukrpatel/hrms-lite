import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [departmentSummary, setDepartmentSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      // Fetch all employees
      const res = await API.get("/employees");
      setEmployees(res.data);

      // Compute department-wise count
      const summary = {};
      res.data.forEach(emp => {
        summary[emp.department] = (summary[emp.department] || 0) + 1;
      });
      setDepartmentSummary(summary);

      setError("");
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employee_code) => {
    try {
      await API.delete(`/employees/${employee_code}`);
      fetchEmployees(); // reload list after delete
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h3>Employees</h3>

      <EmployeeForm onEmployeeAdded={fetchEmployees} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="flex-wrapper">
          <div className="table-container">
            <EmployeeList employees={employees} onDelete={handleDelete} />
          </div>

          <div className="summary">
            <h4>Department Summary</h4>
            {Object.keys(departmentSummary).length === 0 ? (
              <p>No employees found</p>
            ) : (
              Object.entries(departmentSummary).map(([dept, count]) => (
                <p key={dept}>
                  <strong>{dept}:</strong> {count}
                </p>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeesPage;