// store/actions/menuAction.ts
import { AxiosError } from "axios";
import { AppDispatch, RootState } from "../index";
import { setMenuLoading, setProducts, setMenuError } from "../slices/menuSlice";
import { api } from "@/lib/api";

export const fetchProductsAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { menu } = getState();

    if (menu.hasFetched && menu.products.length > 0) {
        return;
    }

    try {
        dispatch(setMenuLoading(true));
        const response = await api.get("/menu");

        const fetchedProducts = response.data.data.items;

        dispatch(setProducts(fetchedProducts));
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        console.error("Fetch products failed", err);
        dispatch(setMenuError(err?.response?.data?.message || "Failed to fetch menu"));
    } finally {
        dispatch(setMenuLoading(false));
    }
};