import axios from "axios";
import {refreshToken} from "./services/auth/auth.service";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await refreshToken();
        return axiosClient.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);
