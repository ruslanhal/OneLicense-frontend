import axios from "axios";
import { refreshToken } from "./services/auth/auth.service";
import { Navigate } from "react-router";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosClient.interceptors.response.use(
//   response => response, // Directly return successful responses.
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
//       try {
//         const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
//         // Make a request to your auth server to refresh the token.
//         const response = await axios.post('https://your.auth.server/refresh', {
//           refreshToken,
//         });
//         const { accessToken, refreshToken: newRefreshToken } = response.data;
//         // Store the new access and refresh tokens.
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('refreshToken', newRefreshToken);
//         // Update the authorization header with the new access token.
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest); // Retry the original request with the new access token.
//       } catch (refreshError) {
//         // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//         console.error('Token refresh failed:', refreshError);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // For all other errors, return the error as is.
//   }
// );

// axiosClient.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await refreshToken();
//         return axiosClient.request(originalRequest);
//       } catch (e) {
//         console.log("Not authorized");
//       }
//     }
//     throw error;
//   }
// );

axiosClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log("-=-=-=-=-=-=,originalRequest", originalRequest);
    // console.log("-==-=-=-=error", error);
    // const isRetr = originalRequest.config._isRetry;
    if (error.response.status === 401 && !originalRequest?.config?._isRetry) {
      // console.log("-=-=-=-=-=-=,originalRequest", originalRequest);

      originalRequest._isRetry = true;
      // console.log("-=-=-=-=-=-=,originalRequest", originalRequest);

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
