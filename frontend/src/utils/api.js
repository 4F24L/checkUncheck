import axios from "axios";

const BASE_URL = "https://checkuncheck.up.railway.app"; // Updated backend URL

const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json", 
  },
});

export default api;
