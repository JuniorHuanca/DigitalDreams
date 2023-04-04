import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import userSlice from "./users/user/userSlice";
import productsSlice from "./products/products/productsSlice";
import { api } from "./api";
export const rootReducer = combineReducers({
    global: globalSlice,
    [api.reducerPath]: api.reducer,
    user: userSlice,
    products: productsSlice
})
export type RootState = ReturnType<typeof rootReducer>;