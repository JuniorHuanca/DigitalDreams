import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric } from "@/shared/util/types";
import { getProductsByApi } from "./productsApi";

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsByApi()
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
interface IUserState {
    products: [],
    allProductsStatus: EStateGeneric,
}
const initialState = {
    products: [],
    allProductsStatus: EStateGeneric.IDLE,
} as IUserState;

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.allProductsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.allProductsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.allProductsStatus = EStateGeneric.FAILED;
        })
    },
});

export default productsSlice.reducer;

