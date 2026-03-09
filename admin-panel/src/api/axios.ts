import { store } from "@/store";
import { logout, setAccessToken } from "@/store/slices/authSlice";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const currStore = store.getState();
  const token = currStore.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");

        const newToken = data.data.accessToken;

        store.dispatch(setAccessToken(newToken));

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
