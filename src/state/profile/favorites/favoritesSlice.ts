import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IFavorite } from "@/shared/util/types";
import { RootState } from "@/state/store";
import {
  deleteFavoritesUserByApi,
  getFavoriteUserByApi,
  getFavoritesUserByApi,
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
  favorite: boolean;
  allFavoritesStatus: EStateGeneric;
  deleteFavoriteStatus: EStateGeneric;
  postFavoriteStatus: EStateGeneric;
}
const initialState = {
  favorites: [],
  favorite: false,
  allFavoritesStatus: EStateGeneric.IDLE,
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
      console.log(action.payload);
    });
    builder.addCase(getOneFavorite.pending, (state, action) => {});
    builder.addCase(getOneFavorite.rejected, (state, action) => {});
  },
});
export default profileSlice.reducer;

export const selectAllFavoritesStatus = (state: RootState) =>
  state.profile.allFavoritesStatus;
export const selectDeleteFavoriteStatus = (state: RootState) =>
  state.profile.deleteFavoriteStatus;
export const selectPostFavoriteStatus = (state: RootState) =>
  state.profile.postFavoriteStatus;

export const { cleanUpProductsFavorites, cleanUpProductFavorite } =
  profileSlice.actions;

export const selectAllFavorites = (state: RootState) => state.profile.favorites;
export const selectOneFavorite = (state: RootState) => state.profile.favorite;
