import { useState } from "react";
import API from "../services/api";
import "./AttendanceForm.css"; // import CSS

function AttendanceForm({ onAttendanceAdded }) {
  const [form, setForm] = useState({
    employee_code: "",
    status: "Present",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/attendance", form);
      setSuccess("Attendance marked successfully");
      setError("");
      setForm({ employee_code: "", status: "Present" });

      onAttendanceAdded(); // refresh list
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.detail || "Failed to mark attendance");
    }
  };

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          name="employee_code"
          placeholder="Employee Code"
          value={form.employee_code}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Mark Attendance</button>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
    </form>
  );
}

export default AttendanceForm;