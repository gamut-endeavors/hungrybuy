"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsAction } from "@/store/actions/menuAction";
import { useCallback, useEffect } from "react";
import { AxiosError } from "axios";

export function useMenu() {
    const dispatch = useAppDispatch();
    const menuState = useAppSelector((state) => state.menu);

    useEffect(() => {

        const fetchMenu = async () => {
            try {
                await dispatch(fetchProductsAction())
            } catch (error) {
                console.error("Failed to load menu", error as AxiosError);
            }
        };

        fetchMenu();
    }, [dispatch]);

    return menuState;

}