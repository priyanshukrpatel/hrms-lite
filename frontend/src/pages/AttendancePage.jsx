import { useEffect, useState } from "react";
import API from "../services/api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";
import "./AttendancePage.css"; // ✅ Import CSS

function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState({ present: 0, absent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance");
      setAttendance(res.data);

      const today = new Date().toISOString().slice(0, 10);
      let present = 0, absent = 0;
      res.data.forEach(record => {
        if (record.date === today) {
          if (record.status === "Present") present++;
          else if (record.status === "Absent") absent++;
        }
      });
      setSummary({ present, absent });

      setError("");
    } catch (err) {
      setError("Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="container">
      <h3>Attendance</h3>

      <AttendanceForm onAttendanceAdded={fetchAttendance} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="flex-wrapper">
          <div className="attendance-table">
            <AttendanceList attendance={attendance} />
          </div>

          <div className="summary">
            <h4>Today's Summary</h4>
            <p><span className="status-present">Present:</span> {summary.present}</p>
            <p><span className="status-absent">Absent:</span> {summary.absent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;