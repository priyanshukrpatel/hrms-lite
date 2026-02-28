import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-backend-2jgl.onrender.com",
});

/* ========================
   EMPLOYEES
======================== */

export const getEmployees = () => API.get("/employees");

export const addEmployee = (data) =>
  API.post("/employees", data);

export const deleteEmployee = (id) =>
  API.delete(`/employees/${id}`);

/* ========================
   ATTENDANCE
======================== */

export const markAttendance = (data) =>
  API.post("/attendance", data);

export const getAttendance = () =>
  API.get("/attendance");

export default API;