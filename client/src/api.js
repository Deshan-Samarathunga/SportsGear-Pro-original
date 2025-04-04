// client/src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
