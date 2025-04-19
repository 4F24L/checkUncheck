import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api", // Set this in .env
  withCredentials: true, // for sending cookies if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add token to headers if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
