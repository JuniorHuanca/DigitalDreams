import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserByApi, updateUserByApi, updateUserImageByApi } from "./userApi";
import { EStateGeneric } from "@/shared/util/types";
import { RootState } from "@/state/store";

export const getOneUser = createAsyncThunk(
  "user/getOneUser",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await getUserByApi(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOneUser = createAsyncThunk(
  "user/updateOneUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await updateUserByApi(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateImageOneUser = createAsyncThunk(
  "user/updateImageOneUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await updateUserImageByApi(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface IUserState {
  user: {};
  oneUserStatus: EStateGeneric;
}
const initialState = {
  user: {},
  oneUserStatus: EStateGeneric.IDLE,
} as IUserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getOneUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.oneUserStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getOneUser.pending, (state, action) => {
      state.oneUserStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getOneUser.rejected, (state, action) => {
      state.oneUserStatus = EStateGeneric.FAILED;
    });
  },
});

export const selectOneUserStatus = (state: RootState) =>
  state.user.oneUserStatus;

export default userSlice.reducer;

export const selectOneUser = (state: RootState) => state.user.user;
