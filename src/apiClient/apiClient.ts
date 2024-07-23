import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const cookies = document.cookie;
    console.log("-=-=-=-=-=-=-=cookies", cookies);

    // Якщо кукі вже в заголовках запиту, не потрібно додавати їх знову
    if (cookies) {
      config.headers["Cookie"] = cookies; // Додаємо кукі до заголовка запиту
    }

    return config;
  },
  (error) => {
    // Обробка помилок при налаштуванні запиту
    return Promise.reject(error);
  }
);
