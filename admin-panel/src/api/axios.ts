import { store } from "@/store";
import { logout, setAuth } from "@/store/slices/authSlice";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const currStore = store.getState();
  let token = currStore.auth.accessToken;

  if (token !== null && typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        store.dispatch(
          setAuth({
            user: refreshRes.data.user,
            accessToken: refreshRes.data.accessToken,
          }),
        );

        error.config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;

        return axios(error.config);
      } catch {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  },
);
