import { createSlice } from "@reduxjs/toolkit";

interface IIsClicked {
  chat?: boolean,
  cart?: boolean,
  userProfile?: boolean,
  notification?: boolean,
}

interface IState {
  mode: string,
  userId: string,
  isClicked: any,
  openLogin: boolean,
  loader: boolean,
}

const initialState = {
  mode: "system",
  userId: "63701cc1f03239b7f700000e",
  isClicked: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  },
  openLogin: true,
  loader: false,
} as IState;

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setModeInitial: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      }
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    handleClickModal: (state, items) => {
      const { payload } = items
      const isClicked = state.isClicked[payload];
      Object.keys(state.isClicked).forEach(key => {
        state.isClicked[key] = false;
      });
      if (!isClicked) {
        state.isClicked[payload] = true;
      }
    },
    cleanupModals: (state, item) => {
      const { payload } = item
      state.isClicked[payload] = false;
    },
    setOpenLogin: (state, action) => {
      state.openLogin = action.payload
    },
    setLoader: (state) => {
      state.loader = !state.loader
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});


export default globalSlice.reducer;

export const selectIsClicked = (state: { global: { isClicked: IIsClicked; }; }) => state.global.isClicked

export const selectOpenLogin = (state: { global: { openLogin: boolean; }; }) => state.global.openLogin

export const selectLoader = (state: { global: { loader: boolean; }; }) => state.global.loader


export const { setModeInitial, setMode, handleClickModal, cleanupModals, setOpenLogin, setLoader } = globalSlice.actions;
