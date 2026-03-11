"use client";

import { Provider } from "react-redux";
import { store } from "../../store/index";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { initializeAuthAction } from "../../store/actions/authAction";
import { api } from "@/lib/api";
import { fetchCartAction } from "@/store/actions/cartAction";
import { AxiosError } from "axios";
import Loading from "../other/Loading";

function AppInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    const isAuthLoading = useAppSelector((state) => state.auth.isLoading);

    useEffect(() => {
        dispatch(initializeAuthAction());
    }, [dispatch]);

    if (isAuthLoading) {
        return <Loading />;
    }

    return <>{children}</>;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AppInitializer>
                {children}
            </AppInitializer>
        </Provider>
    );
}