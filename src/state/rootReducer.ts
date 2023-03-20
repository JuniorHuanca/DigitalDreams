import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import userSlice from "./users/user/userSlice";
import { api } from "./api";
export const rootReducer = combineReducers({
    global: globalSlice,
    [api.reducerPath]: api.reducer,
    user: userSlice
})
export type RootState = ReturnType<typeof rootReducer>;