import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nexlearn.noviindusdemosites.in"
    : "http://localhost:3000/api"; // local proxy for development

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically attach token on client-side
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // ✅ If FormData is used, let the browser set Content-Type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized response
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // Redirect to login if not already on login/otp pages
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/otp")
        ) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
