import { AppDispatch } from "../index";
import { setAuthLoading, setCredentials, User } from "../slices/authSlice";
import { api } from "@/lib/api";
import axios from "axios";
import { fetchCartAction } from "./cartAction";

export const initializeAuthAction = () => async (dispatch: AppDispatch) => {
  dispatch(setAuthLoading(true));

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    const { accessToken, user } = response.data.data;

    dispatch(setCredentials({ user, accessToken }));

    const tableToken = JSON.parse(localStorage.getItem("table") || "null");

    if (tableToken) {
      api.defaults.headers.common["x-table-token"] = tableToken.token;
      dispatch(fetchCartAction());
    }
  } catch (error) {
    dispatch(setCredentials(null));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const loginAction = (accessToken: string, userData: User) => async (dispatch: AppDispatch) => {
  dispatch(setCredentials({ user: userData, accessToken }));
};

export const logoutAction = () => async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    dispatch(setCredentials(null));
    window.location.href = "/";
  }
};