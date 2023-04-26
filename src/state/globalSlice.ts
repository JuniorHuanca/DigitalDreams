import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IIsClicked {
  chat?: boolean;
  cart?: boolean;
  userProfile?: boolean;
  notification?: boolean;
}

interface IState {
  mode: string;
  userId: string;
  isClicked: any;
  openLogin: boolean;
  loader: boolean;
  minPageNumLim: number;
  maxPageNumLim: number;
  currentPage: number;
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
  minPageNumLim: 0,
  maxPageNumLim: 10,
  currentPage: 1,
} as IState;

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setModeInitial: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      };
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    handleClickModal: (state, items) => {
      const { payload } = items;
      const isClicked = state.isClicked[payload];
      Object.keys(state.isClicked).forEach((key) => {
        state.isClicked[key] = false;
      });
      if (!isClicked) {
        state.isClicked[payload] = true;
      }
    },
    cleanupModals: (state, item) => {
      const { payload } = item;
      state.isClicked[payload] = false;
    },
    setOpenLogin: (state, action) => {
      state.openLogin = action.payload;
    },
    setLoader: (state) => {
      state.loader = !state.loader;
    },
    setMinPageNumLim: (state, action) => {
      state.minPageNumLim = action.payload;
    },
    setMaxPageNumLim: (state, action) => {
      state.maxPageNumLim = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setAllModals: (state) => {
      return {
        ...state,
        isClicked: {
          chat: false,
          cart: false,
          userProfile: false,
          notification: false,
        },
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export default globalSlice.reducer;

export const selectIsClicked = (state: RootState) => state.global.isClicked;

export const selectOpenLogin = (state: RootState) => state.global.openLogin;

export const selectLoader = (state: RootState) => state.global.loader;
export const selectMinPageNumLim = (state: RootState) =>
  state.global.minPageNumLim;
export const selectMaxPageNumLim = (state: RootState) =>
  state.global.maxPageNumLim;
export const selectCurrentPage = (state: RootState) => state.global.currentPage;

export const {
  setModeInitial,
  setMode,
  handleClickModal,
  cleanupModals,
  setOpenLogin,
  setLoader,
  setMinPageNumLim,
  setMaxPageNumLim,
  setCurrentPage,
  setAllModals,
} = globalSlice.actions;
