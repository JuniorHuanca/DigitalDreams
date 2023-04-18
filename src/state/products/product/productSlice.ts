import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProduct } from "@/shared/util/types";
import {
  deleteReviewApi,
  getProductByApi,
  getReviewsProductByApi,
  postReviewApi,
  putReviewApi,
} from "./productApi";
import { RootState } from "@/state/store";

export const getOneProduct = createAsyncThunk(
  "product/getOneProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getProductByApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllReviewsProduct = createAsyncThunk(
  "product/getAllReviewsProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getReviewsProductByApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postOneReview = createAsyncThunk(
  "product/postOneReview",
  async (
    {
      product_id,
      user_id,
      description,
      rating,
    }: {
      product_id: number;
      user_id: string;
      description: string;
      rating: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postReviewApi(
        product_id,
        user_id,
        description,
        rating
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const putOneReview = createAsyncThunk(
  "product/putOneReview",
  async (
    {
      review_id,
      description,
      rating,
    }: { review_id: number; description: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await putReviewApi(review_id, description, rating);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOneReview = createAsyncThunk(
  "product/deleteOneReview",
  async (review_id: number, { rejectWithValue }) => {
    try {
      const response = await deleteReviewApi(review_id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
interface IProductState {
  product: IProduct;
  reviews: [];
  oneProductStatus: EStateGeneric;
  allReviewsStatus: EStateGeneric;
  postReviewStatus: EStateGeneric;
  deleteReviewStatus: EStateGeneric;
}
const initialState = {
  product: {},
  reviews: [],
  oneProductStatus: EStateGeneric.IDLE,
  allReviewsStatus: EStateGeneric.IDLE,
  postReviewStatus: EStateGeneric.IDLE,
  deleteReviewStatus: EStateGeneric.IDLE,
} as IProductState;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    cleanUpProduct: (state) => {
      return {
        ...state,
        oneProductStatus: EStateGeneric.IDLE,
        allReviewsStatus: EStateGeneric.IDLE,
        product: {} as IProduct,
      };
    },
    // filterByDate: (state, action) => {
    //     // if (action.payload === 'MostRecent') {
    //     //     const filter = [...state.reviews].filter((r: any) => r.createdAt).sort((a: any, b: any) => new Date(a.createdAt) - new Date(b.createdAt));
    //     //     return {
    //     //         ...state,
    //     //         reviews: filter
    //     //     }

    //     // } else if (action.payload === 'Oldest') {
    //     //     const filter = [...state.reviews].filter((r: any) => r.createdAt).sort((a: any, b: any) => new Date(a.createdAt) - new Date(b.createdAt));
    //     //     return {
    //     //         ...state,
    //     //         reviews: filter
    //     //     }

    //     // }
    //     return {
    //         ...state,
    //         reviews: state.reviews
    //     }

    // },
    // filterByRating: (state, action) => {
    //     const filtered = [...state.reviews].filter((review: any) => {
    //         if (action.payload > 5) {
    //             return review.rating
    //         } else {
    //             return review.rating >= action.payload && review.rating < action.payload + 1
    //         }
    //     });
    //     return {
    //         ...state,
    //         reviews: filtered
    //     }
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.oneProductStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getOneProduct.pending, (state, action) => {
      state.oneProductStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.oneProductStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllReviewsProduct.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.allReviewsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllReviewsProduct.pending, (state, action) => {
      state.allReviewsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllReviewsProduct.rejected, (state, action) => {
      state.allReviewsStatus = EStateGeneric.FAILED;
    });

    builder.addCase(postOneReview.fulfilled, (state, action) => {
      state.postReviewStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(postOneReview.pending, (state, action) => {
      state.postReviewStatus = EStateGeneric.PENDING;
    });
    builder.addCase(postOneReview.rejected, (state, action) => {
      state.postReviewStatus = EStateGeneric.FAILED;
    });

    builder.addCase(putOneReview.fulfilled, (state, action) => {});
    builder.addCase(putOneReview.pending, (state, action) => {});
    builder.addCase(putOneReview.rejected, (state, action) => {});

    builder.addCase(deleteOneReview.fulfilled, (state, action) => {
      state.deleteReviewStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(deleteOneReview.pending, (state, action) => {
      state.deleteReviewStatus = EStateGeneric.PENDING;
    });
    builder.addCase(deleteOneReview.rejected, (state, action) => {
      state.deleteReviewStatus = EStateGeneric.FAILED;
    });
  },
});

export default productSlice.reducer;

export const oneProduct = (store: RootState) => store.product.product;
export const allReviews = (store: RootState) => store.product.reviews;

export const {
  cleanUpProduct,
  // filterByDate,
  // filterByRating
} = productSlice.actions;

export const selectOneProductStatus = (state: RootState) =>
  state.product.oneProductStatus;
export const selectAllReviewsStatus = (state: RootState) =>
  state.product.allReviewsStatus;
export const selectPostReviewStatus = (state: RootState) =>
  state.product.postReviewStatus;
