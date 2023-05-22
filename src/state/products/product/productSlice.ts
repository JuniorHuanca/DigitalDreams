import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProduct } from "@/shared/util/types";
import {
  deleteProductByApi,
  deleteProductForEverByApi,
  deleteReviewApi,
  getBrandsNameByApi,
  getProductByApi,
  getReviewsProductByApi,
  getSubcategoriasNameByApi,
  postReviewApi,
  putReviewApi,
  restoreProductByApi,
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
      productId,
      userId,
      description,
      rating,
    }: {
      productId: number;
      userId: string;
      description: string;
      rating: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await postReviewApi(
        productId,
        userId,
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
      reviewId,
      description,
      rating,
    }: { reviewId: number; description: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await putReviewApi(reviewId, description, rating);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOneReview = createAsyncThunk(
  "product/deleteOneReview",
  async (reviewId: number, { rejectWithValue }) => {
    try {
      const response = await deleteReviewApi(reviewId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOneProduct = createAsyncThunk(
  "product/deleteOneProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteProductByApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOneProductForEver = createAsyncThunk(
  "product/deleteOneProductForEver",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteProductForEverByApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const restoreOneProduct = createAsyncThunk(
  "product/restoreOneProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await restoreProductByApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "product/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBrandsNameByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllSubcategorias = createAsyncThunk(
  "product/getAllSubcategorias",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSubcategoriasNameByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
interface IProductState {
  product: IProduct;
  reviews: [];
  brands: [];
  subcategorias: [];
  oneProductStatus: EStateGeneric;
  allReviewsStatus: EStateGeneric;
  postReviewStatus: EStateGeneric;
  deleteReviewStatus: EStateGeneric;
  deleteProductStatus: EStateGeneric;
}
const initialState = {
  product: {},
  reviews: [],
  brands: [],
  subcategorias: [],
  oneProductStatus: EStateGeneric.IDLE,
  allReviewsStatus: EStateGeneric.IDLE,
  postReviewStatus: EStateGeneric.IDLE,
  deleteReviewStatus: EStateGeneric.IDLE,
  deleteProductStatus: EStateGeneric.IDLE,
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

    builder.addCase(deleteOneProduct.fulfilled, (state, action) => {
      state.deleteProductStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(deleteOneProduct.pending, (state, action) => {
      state.deleteProductStatus = EStateGeneric.PENDING;
    });
    builder.addCase(deleteOneProduct.rejected, (state, action) => {
      state.deleteProductStatus = EStateGeneric.FAILED;
    });

    builder.addCase(restoreOneProduct.fulfilled, (state, action) => {});
    builder.addCase(restoreOneProduct.pending, (state, action) => {});
    builder.addCase(restoreOneProduct.rejected, (state, action) => {});

    builder.addCase(deleteOneProductForEver.fulfilled, (state, action) => {});
    builder.addCase(deleteOneProductForEver.pending, (state, action) => {});
    builder.addCase(deleteOneProductForEver.rejected, (state, action) => {});

    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    builder.addCase(getAllBrands.pending, (state, action) => {});
    builder.addCase(getAllBrands.rejected, (state, action) => {});

    builder.addCase(getAllSubcategorias.fulfilled, (state, action) => {
      state.subcategorias = action.payload;
    });
    builder.addCase(getAllSubcategorias.pending, (state, action) => {});
    builder.addCase(getAllSubcategorias.rejected, (state, action) => {});
  },
});

export default productSlice.reducer;

export const oneProduct = (store: RootState) => store.product.product;
export const allReviews = (store: RootState) => store.product.reviews;
export const allBrands = (store: RootState) => store.product.brands;
export const allSubcategorias = (store: RootState) =>
  store.product.subcategorias;

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
