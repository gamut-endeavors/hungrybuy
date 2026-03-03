// store/slices/menuSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "@/lib/types";

export interface MenuState {
  products: MenuItem[];
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean; 
}

const initialState: MenuState = {
  products: [],
  isLoading: false,
  error: null,
  hasFetched: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action: PayloadAction<MenuItem[]>) => {
      state.products = action.payload;
      state.hasFetched = true; 
      state.error = null;
    },
    setMenuError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setMenuLoading, setProducts, setMenuError } = menuSlice.actions;
export default menuSlice.reducer;