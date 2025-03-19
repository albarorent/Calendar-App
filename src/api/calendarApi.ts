import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

export const calendarApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

calendarApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // localStorage.removeItem("token");
      // window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);
