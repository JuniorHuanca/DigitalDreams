import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IReport, IReview } from "@/shared/util/types";
import { RootState } from "@/state/store";
import { getReviewsWithReportsApi } from "./reviewsApi";

export const getAllReports = createAsyncThunk(
  "reviews/getAllReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getReviewsWithReportsApi();
      return response.data.reports;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface IReviewsState {
  reviews: IReview;
  reports: [];
  allReviewsReportsStatus: EStateGeneric;
  allReportsStatus: EStateGeneric;
}
const initialState = {
  reviews: {},
  reports: [],
  allReviewsReportsStatus: EStateGeneric.IDLE,
  allReportsStatus: EStateGeneric.IDLE,
} as IReviewsState;

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllReports.fulfilled, (state, action) => {
      state.reports = action.payload;
      state.allReportsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllReports.pending, (state, action) => {
      state.allReportsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllReports.rejected, (state, action) => {
      state.allReportsStatus = EStateGeneric.FAILED;
    });
  },
});

export const selectAllReviewsReportsStatus = (state: RootState) =>
  state.reviews.allReviewsReportsStatus;
export const selectAllReportsStatus = (state: RootState) =>
  state.reviews.allReportsStatus;

export default reviewsSlice.reducer;

export const selectAllReviewsReports = (state: RootState) =>
  state.reviews.reviews;
export const selectAllReports = (state: RootState) => state.reviews.reports;
