import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "https://talktive-backend.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL + "/api",   // IMPORTANT!!
  withCredentials: true,
});
