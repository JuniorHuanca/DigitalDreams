import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IFavorite, IReview } from "@/shared/util/types";
import { RootState } from "@/state/store";
import {
  deleteFavoritesUserByApi,
  getFavoriteUserByApi,
  getFavoritesUserByApi,
  getReviewsUserByApi,
  postFavoriteUserByApi,
} from "./favoritesApi";

export const getAllFavorites = createAsyncThunk(
  "profile/getAllFavorites",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getFavoritesUserByApi(userId);
      return response.data.favorites;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "profile/getAllReviews",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getReviewsUserByApi(userId);
      return response.data.reviews;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneFavorite = createAsyncThunk(
  "profile/getOneFavorite",
  async (
    { userId, productId }: { userId: string; productId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getFavoriteUserByApi(userId, productId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOneFavorite = createAsyncThunk(
  "profile/deleteOneFavorite",
  async (
    { userId, productId }: { userId: string; productId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await deleteFavoritesUserByApi(userId, productId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postOneFavorite = createAsyncThunk(
  "profile/postOneFavorite",
  async (
    { userId, productId }: { userId: string; productId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await postFavoriteUserByApi(userId, productId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface IProfileState {
  favorites: IFavorite[];
  reviews: IReview[];
  favorite: boolean;
  allFavoritesStatus: EStateGeneric;
  allReviewsStatus: EStateGeneric;
  deleteFavoriteStatus: EStateGeneric;
  postFavoriteStatus: EStateGeneric;
}
const initialState = {
  favorites: [],
  reviews: [],
  favorite: false,
  allFavoritesStatus: EStateGeneric.IDLE,
  allReviewsStatus: EStateGeneric.IDLE,
  deleteFavoriteStatus: EStateGeneric.IDLE,
  postFavoriteStatus: EStateGeneric.IDLE,
} as IProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    cleanUpProductsFavorites: (state) => {
      return {
        ...state,
        favorites: [],
        allFavoritesStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpReviews: (state) => {
      return {
        ...state,
        reviews: [],
        allReviewsStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpProductFavorite: (state) => {
      return {
        ...state,
        favorite: false,
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.allFavoritesStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllFavorites.pending, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllFavorites.rejected, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.allReviewsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllReviews.pending, (state, action) => {
      state.allReviewsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.allReviewsStatus = EStateGeneric.FAILED;
    });

    builder.addCase(deleteOneFavorite.fulfilled, (state, action) => {
      state.deleteFavoriteStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(deleteOneFavorite.pending, (state, action) => {
      state.deleteFavoriteStatus = EStateGeneric.PENDING;
    });
    builder.addCase(deleteOneFavorite.rejected, (state, action) => {
      state.deleteFavoriteStatus = EStateGeneric.FAILED;
    });

    builder.addCase(postOneFavorite.fulfilled, (state, action) => {
      state.postFavoriteStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(postOneFavorite.pending, (state, action) => {
      state.postFavoriteStatus = EStateGeneric.PENDING;
    });
    builder.addCase(postOneFavorite.rejected, (state, action) => {
      state.postFavoriteStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getOneFavorite.fulfilled, (state, action) => {
      state.favorite = action.payload.success;
    });
    builder.addCase(getOneFavorite.pending, (state, action) => {});
    builder.addCase(getOneFavorite.rejected, (state, action) => {
      state.favorite = (action.payload as { success: boolean }).success;
    });
  },
});
export default profileSlice.reducer;

export const selectAllReviewsStatus = (state: RootState) =>
  state.profile.allReviewsStatus;
export const selectAllFavoritesStatus = (state: RootState) =>
  state.profile.allFavoritesStatus;
export const selectDeleteFavoriteStatus = (state: RootState) =>
  state.profile.deleteFavoriteStatus;
export const selectPostFavoriteStatus = (state: RootState) =>
  state.profile.postFavoriteStatus;

export const {
  cleanUpProductsFavorites,
  cleanUpProductFavorite,
  cleanUpReviews,
} = profileSlice.actions;

export const selectAllFavorites = (state: RootState) => state.profile.favorites;
export const selectAllReviews = (state: RootState) => state.profile.reviews;
export const selectOneFavorite = (state: RootState) => state.profile.favorite;
