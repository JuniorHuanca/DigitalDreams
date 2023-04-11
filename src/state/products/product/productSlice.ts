import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProduct } from "@/shared/util/types";
import { getProductByApi, postReviewApi } from "./productApi";
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

export const postOneReview = createAsyncThunk(
    'product/postOneReview',
    async ({ product_id, user_id, description, rating }: { product_id: number, user_id: string, description: string, rating: number }, { rejectWithValue }) => {
        try {
            const response = await postReviewApi(product_id, user_id, description, rating)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
interface IProductState {
    product: IProduct,
    oneProductStatus: EStateGeneric,
    postReviewStatus: EStateGeneric,
}
const initialState = {
    product: {},
    oneProductStatus: EStateGeneric.IDLE,
    postReviewStatus: EStateGeneric.IDLE,
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

        builder.addCase(postOneReview.fulfilled, (state, action) => {
            state.postReviewStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(postOneReview.pending, (state, action) => {
            state.postReviewStatus = EStateGeneric.PENDING;
        })
        builder.addCase(postOneReview.rejected, (state, action) => {
            state.postReviewStatus = EStateGeneric.FAILED;
        })
    },
});

export default productSlice.reducer;

export const oneProduct = (store: RootState) => store.product.product

export const {
    cleanUpProduct,
} = productSlice.actions;

export const selectOneProductStatus = (state: { product: { oneProductStatus: EStateGeneric; }; }) => state.product.oneProductStatus
export const selectPostReviewStatus = (state: { product: { postReviewStatus: EStateGeneric; }; }) => state.product.postReviewStatus