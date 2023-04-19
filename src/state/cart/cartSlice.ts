import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProductCart } from "@/shared/util/types";
import { RootState } from "@/state/store";

interface ICart {
  cart: IProductCart[];
  subTotal: number[];
  totalSell: number;
  oneUserStatus: EStateGeneric;
}
const initialState = {
  cart: [],
  subTotal: [],
  totalSell: 0,
  oneUserStatus: EStateGeneric.IDLE,
} as ICart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewProduct: (state, action) => {
      const product = action.payload;
      const productExists = !!state.cart.find((c) => c.id === product.id);
      if (productExists) {
        state.cart = [...state.cart].map((c) => {
          if (c.id === action.payload.id && c.quantity < c.product.stock) {
            return {
              ...c,
              quantity: c.quantity + 1,
            };
          } else return c;
        });
      } else {
        state.cart = state.cart.concat({
          id: product.id,
          product,
          quantity: 1,
        });
      }
    },
    minusOneProduct: (state, action) => {
      state.cart = [...state.cart].map((c) => {
        if (c.id === action.payload && c.quantity > 0) {
          return {
            ...c,
            quantity: c.quantity - 1,
          };
        } else return c;
      });
    },
    plusOneProduct: (state, action) => {
      state.cart = [...state.cart].map((c) => {
        if (c.id === action.payload) {
          return {
            ...c,
            quantity: c.quantity + 1,
          };
        } else return c;
      });
    },
    minusAllProducts: (state, action) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload);
    },
    totalPrice: (state, action) => {
      action.payload.filter((e: number) => {
        state.totalSell += e;
      });
    },
    setSubtotalArray: (state, action) => {
      state.subTotal = state.subTotal.concat(action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const allProductsCart = (store: RootState) => store.cart.cart;

export const {
  addNewProduct,
  minusOneProduct,
  plusOneProduct,
  minusAllProducts,
  totalPrice,
  setSubtotalArray,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
