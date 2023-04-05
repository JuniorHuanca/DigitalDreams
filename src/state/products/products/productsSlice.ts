import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProduct } from "@/shared/util/types";
import { getProductsBrandByApi, getProductsRecommendedByApi } from "./productsApi";
import { RootState } from "@/state/store";

export const getAllProductsRecommended = createAsyncThunk(
    'products/getAllProductsRecommended',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsRecommendedByApi()
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllProductsBrand = createAsyncThunk(
    'products/getAllProductsBrand',
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await getProductsBrandByApi(name)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
interface IUserState {
    products: IProduct[],
    productsBrand: IProduct[],
    productsRecommended: IProduct[],
    allProductsStatus: EStateGeneric,
    allProductsStatusBrand: EStateGeneric,
    allProductsStatusRecommended: EStateGeneric,
}
const initialState = {
    products: [],
    productsBrand: [],
    productsRecommended: [],
    allProductsStatus: EStateGeneric.IDLE,
    allProductsStatusBrand: EStateGeneric.IDLE,
    allProductsStatusRecommended: EStateGeneric.IDLE,
} as IUserState;

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductsRecommended: (state) => {
            return {
                ...state,
                productsRecommended: [],
                allProductsStatusRecommended: EStateGeneric.IDLE
            }
        },
        cleanUpProductsBrand: (state) => {
            return {
                ...state,
                productsBrand: [],
                allProductsStatusBrand: EStateGeneric.IDLE
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllProductsRecommended.fulfilled, (state, action) => {
            state.productsRecommended = action.payload.products;
            state.allProductsStatusRecommended = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsRecommended.pending, (state, action) => {
            state.allProductsStatusRecommended = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsRecommended.rejected, (state, action) => {
            state.allProductsStatusRecommended = EStateGeneric.FAILED;
        })

        builder.addCase(getAllProductsBrand.fulfilled, (state, action) => {
            state.productsBrand = action.payload.products;
            state.allProductsStatusBrand = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsBrand.pending, (state, action) => {
            state.allProductsStatusBrand = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsBrand.rejected, (state, action) => {
            state.allProductsStatusBrand = EStateGeneric.FAILED;
        })
    },
});

export default productsSlice.reducer;

export const allProductsRecommended = (store: RootState) => store.products.productsRecommended
export const allProductsBrand = (store: RootState) => store.products.productsBrand

export const { cleanUpProductsRecommended, cleanUpProductsBrand } = productsSlice.actions;

export const selectAllProductsRecommendedStatus = (state: { products: { allProductsStatusRecommended: EStateGeneric; }; }) => state.products.allProductsStatusRecommended
export const selectAllProductsBrandStatus = (state: { products: { allProductsStatusBrand: EStateGeneric; }; }) => state.products.allProductsStatusBrand