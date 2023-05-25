import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric } from "@/shared/util/types";
import { RootState } from "@/state/store";
import { getFavoritesUserByApi } from "./favoritesApi";

export const getAllFavorites = createAsyncThunk(
  "profile/getAllFavorites",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getFavoritesUserByApi(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface IProfileState {
  favorites: any;
  allFavoritesStatus: EStateGeneric;
}
const initialState = {
  favorites: [],
  allFavoritesStatus: EStateGeneric.IDLE,
} as IProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
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
  },
});

export const selectAllFavoritesStatus = (state: RootState) =>
  state.profile.allFavoritesStatus;

export default profileSlice.reducer;

export const selectAllFavorites = (state: RootState) => state.profile.favorites;
