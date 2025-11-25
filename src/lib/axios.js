import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "https://talktive-backend.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL + "/api",   // IMPORTANT!!
  withCredentials: true,
});

// Add token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response and extract token if present
axiosInstance.interceptors.response.use(
  (response) => {
    // If response has a token, save it
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
