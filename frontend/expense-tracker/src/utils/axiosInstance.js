import { BASE_URL } from "./apiPaths";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // ✅ match your login.jsx and signup.jsx
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.log("Server error, please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("A timeout has occurred");
    }

    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
