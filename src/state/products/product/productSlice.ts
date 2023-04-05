import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProduct } from "@/shared/util/types";
import { getProductByApi } from "./productApi";
import { RootState } from "@/state/store";

export const getOneProduct = createAsyncThunk(
    'product/getOneProduct',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await getProductByApi(id)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
interface IProductState {
    product: IProduct,
    oneProductStatus: EStateGeneric,
}
const initialState = {
    product: {},
    oneProductStatus: EStateGeneric.IDLE,
} as IProductState;

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        cleanUpProduct: (state) => {
            return {
                ...state,
                oneProductStatus: EStateGeneric.IDLE,
                product: {} as IProduct
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(getOneProduct.fulfilled, (state, action) => {
            state.product = action.payload.product;
            state.oneProductStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getOneProduct.pending, (state, action) => {
            state.oneProductStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getOneProduct.rejected, (state, action) => {
            state.oneProductStatus = EStateGeneric.FAILED;
        })
    },
});

export default productSlice.reducer;

export const oneProduct = (store: RootState) => store.product.product

export const {
    cleanUpProduct,
} = productSlice.actions;

export const selectOneProductStatus = (state: { product: { oneProductStatus: EStateGeneric; }; }) => state.product.oneProductStatus