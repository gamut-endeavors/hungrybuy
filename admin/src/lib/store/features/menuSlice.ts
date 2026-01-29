import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import { Product, MenuVariant } from '@/lib/types';

interface MenuState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    products: [],
    isLoading: false,
    error: null,
};

// --- HELPER TYPES ---
// Updated: variants can now optionally have an 'id' (needed for updates)
interface CreateProductPayload {
    name: string;
    description?: string;
    price: number; // in cents
    categoryId: string;
    foodType: 'VEG' | 'NON_VEG';
    variants: { id?: string; label: string; price: number }[]; 
}

interface UpdateProductPayload extends CreateProductPayload {
    id: string;
    isAvailable: boolean;
}

// --- ASYNC THUNKS ---

export const fetchProducts = createAsyncThunk(
    'menu/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/menu');
            return response.data.data.items;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch menu');
        }
    }
);

export const addProduct = createAsyncThunk(
    'menu/add',
    async (payload: CreateProductPayload, { rejectWithValue, dispatch }) => {
        try {
            // 1. Create the Main Item
            const itemResponse = await api.post('/menu/create', {
                name: payload.name,
                description: payload.description,
                price: payload.price,
                foodType: payload.foodType,
                categoryId: payload.categoryId
            });

            const newItem = itemResponse.data.data.item;

            // 2. Create Variants
            if (payload.variants.length > 0) {
                // Use Promise.all for faster parallel creation
                await Promise.all(payload.variants.map(variant => 
                    api.post(`/menu/${newItem.id}/variants`, {
                        label: variant.label,
                        price: variant.price
                    })
                ));
            }

            dispatch(fetchProducts());
            return newItem;

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add product');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'menu/update',
    async (payload: UpdateProductPayload, { rejectWithValue, dispatch }) => {
        try {
            // 1. Update Main Item Fields
            await api.patch(`/menu/${payload.id}`, {
                name: payload.name,
                description: payload.description,
                price: payload.price,
                foodType: payload.foodType,
                categoryId: payload.categoryId,
                isAvailable: payload.isAvailable
            });

            // --- 2. SYNC VARIANTS (The Logic You Were Missing) ---
            
            // A. Fetch current variants from DB to know what exists
            const existingVarsResponse = await api.get(`/menu/${payload.id}/variants`);
            const dbVariants: any[] = existingVarsResponse.data.data.variants || [];

            // B. Identify Changes
            const payloadVariantIds = payload.variants.map(v => v.id).filter(Boolean);

            // To Delete: Variants in DB that are NOT in the new payload
            const toDelete = dbVariants.filter(v => !payloadVariantIds.includes(v.id));

            // To Add: Variants in payload that have NO ID
            const toAdd = payload.variants.filter(v => !v.id);

            // To Update: Variants in payload that HAVE an ID
            const toUpdate = payload.variants.filter(v => v.id);

            // C. Execute API Calls (Parallel)
            await Promise.all([
                // Delete removed variants
                ...toDelete.map(v => api.delete(`/menu/${payload.id}/variants/${v.id}`)),
                
                // Add new variants
                ...toAdd.map(v => api.post(`/menu/${payload.id}/variants`, { 
                    label: v.label, 
                    price: v.price 
                })),
                
                // Update modified variants
                ...toUpdate.map(v => api.patch(`/menu/${payload.id}/variants/${v.id}`, { 
                    label: v.label, 
                    price: v.price 
                }))
            ]);

            // 3. Refresh State
            // Because we did complex nested updates, it's safest to re-fetch the fresh tree
            dispatch(fetchProducts());

            return payload; // Return payload to satisfy TS, though fetchProducts handles the state update
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'menu/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            await api.delete(`/menu/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

// --- SLICE ---

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.map((p: any) => ({
                    ...p,
                    image: '/burgers.jpeg'
                }));
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })
            // Update is mostly handled by fetchProducts dispatch now, 
            // but we can leave this for optimistic UI updates if needed later.
            .addCase(updateProduct.fulfilled, (state, action) => {
                 // The fetchProducts dispatch inside the thunk will handle the actual data refresh
            });
    },
});

export default menuSlice.reducer;