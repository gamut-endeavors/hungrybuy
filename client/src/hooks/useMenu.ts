"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsAction } from "@/store/actions/menuAction";
import { useCallback } from "react";

export function useMenu() {
    const dispatch = useAppDispatch();
    const menuState = useAppSelector((state) => state.menu);

    const fetchMenu = useCallback(async () => {
        await dispatch(fetchProductsAction());
    }, [dispatch]);

    return {
        ...menuState,
        fetchMenu,
    };
    
}