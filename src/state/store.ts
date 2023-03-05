import { configureStore } from '@reduxjs/toolkit'
import globalReducer from '@/state/globalSlice'
import { api } from '@/state/api'
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from './rootReducer';
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export default store;