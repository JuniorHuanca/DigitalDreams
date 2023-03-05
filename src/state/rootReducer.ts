import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import { api } from "./api";
export const rootReducer = combineReducers({
    global: globalSlice,
    [api.reducerPath]: api.reducer,
})
export type RootState = ReturnType<typeof rootReducer>;