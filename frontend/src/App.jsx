import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import "./App.css"; 
import logo from "../public/logo.jpeg";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* HEADER */}
        <header className="app-header">
          <div className="logo">

            <img src={logo} alt="HRMS Lite Logo" className="logo-img" />
            <h1>HRMS Lite</h1>
          </div>

          {/* NAVIGATION */}
          <nav className="app-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Employees
            </NavLink>
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Attendance
            </NavLink>
          </nav>
        </header>

        {/* ROUTES */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;