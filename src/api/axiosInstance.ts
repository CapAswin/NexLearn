import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nexlearn.noviindusdemosites.in"
    : "http://localhost:3000"; // use full URL instead of /api for clarity

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
