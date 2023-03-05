import { createSlice } from "@reduxjs/toolkit";

interface IIsClicked {
  chat: boolean,
  cart: boolean,
  userProfile: boolean,
  notification: boolean,
}

interface IState {
  mode: string,
  userId: string,
  isClicked: IIsClicked,
}

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  isClicked: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  }
} as IState;

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    handleClickProfile: (state) => {
      state.isClicked.userProfile = true;
      console.log(state)
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});


export default globalSlice.reducer;

export const selectIsClicked = (state: { isClicked: any; }) => state.isClicked
export const selectMode= (state: { mode: any; }) => state.mode

export const { setMode, handleClickProfile } = globalSlice.actions;
