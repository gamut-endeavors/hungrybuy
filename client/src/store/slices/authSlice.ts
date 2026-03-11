import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    phone: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string } | null>) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            } else {
                state.user = null;
                state.accessToken = null;
            }
        },
    },
});

export const { setAuthLoading, setCredentials } = authSlice.actions;
export default authSlice.reducer;