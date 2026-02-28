import { useState } from "react";
import API from "../services/api";
import "./EmployeeForm.css"; // import CSS

function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = useState({
    employee_code: "",
    name: "",
    email: "",
    department: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", form);

      setSuccess("Employee added successfully!");
      setError("");

      setForm({
        employee_code: "",
        name: "",
        email: "",
        department: ""
      });

      onEmployeeAdded();
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.detail || "Failed to add employee");
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          name="employee_code"
          placeholder="Employee Code"
          value={form.employee_code}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Add Employee</button>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
    </form>
  );
}

export default EmployeeForm;