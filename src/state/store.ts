// import { configureStore } from '@reduxjs/toolkit'
// import globalReducer from '@/state/globalSlice'
// import { api } from '@/state/api'
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { rootReducer } from './rootReducer';
// import { useDispatch } from 'react-redux';
// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefault) => getDefault().concat(api.middleware),
// });
// setupListeners(store.dispatch);
// // Infer the RootState and AppDispatch types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// // Export a hook that can be reused to resolve types
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "./rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["global", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});
// setupListeners(store.dispatch);
export let persistor = persistStore(store);
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>();
