import { combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import userSlice from "./users/user/userSlice";
import productsSlice from "./products/products/productsSlice";
import productSlice from "./products/product/productSlice";
import cartSlice from "./cart/cartSlice";
import reviewsSlice from "./reviews/reviews/reviewsSlice";
import profileSlice from "./profile/favorites/favoritesSlice";
import { api } from "./api";
export const rootReducer = combineReducers({
  global: globalSlice,
  [api.reducerPath]: api.reducer,
  user: userSlice,
  products: productsSlice,
  product: productSlice,
  cart: cartSlice,
  reviews: reviewsSlice,
  profile: profileSlice,
});
