function AttendanceList({ attendance }) {
  if (attendance.length === 0) {
    return <p>No attendance records found.</p>;
  }

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee Code</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((att) => (
          <tr key={att.id}>
            <td>{att.id}</td>
            <td>{att.employee_code}</td>
            <td>{att.status}</td>
            <td>{att.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AttendanceList;