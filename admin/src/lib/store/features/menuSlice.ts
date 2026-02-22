import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import { Product, MenuVariant } from '@/lib/types';
import { AxiosError } from 'axios';
import { RootState } from '@/lib/store/store';

interface AddProductThunkPayload {
    itemData: FormData;
    variants: { label: string; price: number }[];
}

interface UpdateProductThunkPayload {
    id: string;
    itemData: FormData;
    variants: { id?: string; label: string; price: number }[];
}

interface FetchProductsParams {
    cursor?: string | null;
    categoryId?: string;
    limit?: number;
}

interface MenuState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    nextCursor: string | null;
    hasNextPage: boolean;
    activeCategory: string;
}

const initialState: MenuState = {
    products: [],
    isLoading: false,
    error: null,
    nextCursor: null,
    hasNextPage: false,
    activeCategory: 'all',
};


// --- ASYNC THUNKS ---

export const fetchProducts = createAsyncThunk(
    'menu/fetchAll',
    async ({ cursor = null, categoryId, limit = 20 }: FetchProductsParams = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (cursor) params.set('cursor', cursor);
            if (categoryId && categoryId !== 'all') params.set('categoryId', categoryId);
            params.set('limit', String(limit));

            const response = await api.get(`/menu?${params.toString()}`);
            return {
                items: response.data.data.items,
                nextCursor: response.data.data.pagination.nextCursor,
                hasNextPage: response.data.data.pagination.hasNextPage,
                isFirstPage: !cursor,
            };
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch menu');
        }
    }
);

export const addProduct = createAsyncThunk(
    'menu/add',
    async ({ itemData, variants }: AddProductThunkPayload, { rejectWithValue, dispatch, getState }) => {
        try {

            // 1. Create Main Item (Sends Multipart/Form-Data)
            const itemResponse = await api.post('/menu/create', itemData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newItem = itemResponse.data.data.item;

            // 2. Create Variants (Sends JSON - backend unchanged)
            if (variants.length > 0) {
                await Promise.all(variants.map(variant =>
                    api.post(`/menu/${newItem.id}/variants`, {
                        label: variant.label,
                        price: Number(variant.price)
                    })
                ));
            }

            const state = getState() as RootState;
            const activeCategory = state.menu.activeCategory;
            dispatch(fetchProducts({ categoryId: activeCategory }));

            return newItem;

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || 'Failed to add product');
        }
    }
);


export const updateProduct = createAsyncThunk(
    'menu/update',
    async ({ id, itemData, variants }: UpdateProductThunkPayload, { rejectWithValue, dispatch, getState }) => {
        try {
            // 1. Update Main Item (Sends Multipart/Form-Data)
            await api.patch(`/menu/${id}`, itemData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // --- 2. SYNC VARIANTS (Logic preserved) ---

            // A. Fetch current variants
            const existingVarsResponse = await api.get(`/menu/${id}/variants`);
            const dbVariants: MenuVariant[] = existingVarsResponse.data.data.variants || [];

            // B. Identify Changes
            const payloadVariantIds = variants.map(v => v.id).filter(Boolean);

            const toDelete = dbVariants.filter(v => !payloadVariantIds.includes(v.id));
            const toAdd = variants.filter(v => !v.id);
            const toUpdate = variants.filter(v => v.id);

            // C. Execute API Calls
            await Promise.all([
                ...toDelete.map(v => api.delete(`/menu/${id}/variants/${v.id}`)),
                ...toAdd.map(v => api.post(`/menu/${id}/variants`, { label: v.label, price: Number(v.price) })),
                ...toUpdate.map(v => api.patch(`/menu/${id}/variants/${v.id}`, { label: v.label, price: Number(v.price) }))
            ]);

            const state = getState() as RootState;
            const activeCategory = state.menu.activeCategory;
            dispatch(fetchProducts({ categoryId: activeCategory }));

            return id;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || 'Failed to update product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'menu/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/menu/${id}`);
            return id;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || 'Failed to delete product');
        }
    }
);

// --- SLICE ---

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveCategory(state, action) {
            state.activeCategory = action.payload;
            state.products = [];
            state.nextCursor = null;
            state.hasNextPage = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.isFirstPage) {
                    state.products = action.payload.items;
                } else {
                    state.products = [...state.products, ...action.payload.items];
                }
                state.nextCursor = action.payload.nextCursor;
                state.hasNextPage = action.payload.hasNextPage;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, () => {
            });
    },
});

export const { setActiveCategory } = menuSlice.actions;
export default menuSlice.reducer;