import axios from "axios";

// Membuat instance axios dengan header Authorization yang berisi token
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Request URL:", config.url); // Debug URL request
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
