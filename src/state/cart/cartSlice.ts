import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProductCart } from "@/shared/util/types";
import { RootState } from "@/state/store";

interface ICart {
  cart: IProductCart[];
  subTotal: number[];
  totalSell: number;
  itemsCart: number;
  oneUserStatus: EStateGeneric;
}
const initialState = {
  cart: [],
  subTotal: [],
  totalSell: 0,
  itemsCart: 0,
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
        const filterCart = [...state.cart].map((c) => {
          if (c.id === action.payload.id && c.quantity < c.product.stock) {
            return {
              ...c,
              quantity: c.quantity + 1,
            };
          } else return c;
        });
        const items = filterCart.reduce((acc, curr) => acc + curr.quantity, 0);
        return {
          ...state,
          cart: filterCart,
          itemsCart: items,
        };
      } else {
        const filterCart = [...state.cart].concat({
          id: product.id,
          product,
          quantity: 1,
        });
        const items = filterCart.reduce((acc, curr) => acc + curr.quantity, 0);
        return {
          ...state,
          cart: filterCart,
          itemsCart: items,
        };
      }
    },
    minusOneProduct: (state, action) => {
      const filterCart = [...state.cart].map((c) => {
        if (c.id === action.payload && c.quantity > 0) {
          return {
            ...c,
            quantity: c.quantity - 1,
          };
        } else return c;
      });
      const items = filterCart.reduce((acc, curr) => acc + curr.quantity, 0);
      return {
        ...state,
        cart: filterCart,
        itemsCart: items,
      };
    },
    plusOneProduct: (state, action) => {
      const filterCart = [...state.cart].map((c) => {
        if (c.id === action.payload) {
          return {
            ...c,
            quantity: c.quantity + 1,
          };
        } else return c;
      });
      const items = filterCart.reduce((acc, curr) => acc + curr.quantity, 0);
      return {
        ...state,
        cart: filterCart,
        itemsCart: items,
      };
    },
    minusAllProducts: (state, action) => {
      const filterCart = state.cart.filter((c) => c.id !== action.payload);
      const items = filterCart.reduce((acc, curr) => acc + curr.quantity, 0);
      return {
        ...state,
        cart: filterCart,
        itemsCart: items,
      };
    },
    totalPrice: (state, action) => {
      action.payload.filter((e: number) => {
        state.totalSell += e;
      });
    },
    setSubtotalArray: (state, action) => {
      return {
        ...state,
        subTotal: state.subTotal.concat(action.payload),
      };
    },
    setCartArray: (state, action) => {
      const items = [...action.payload].reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      return {
        ...state,
        cart: action.payload,
        itemsCart: items,
      };
    },
    setItemsCart: (state, action) => {
      return {
        ...state,
        itemsCart: action.payload,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const allProductsCart = (store: RootState) => store.cart.cart;
export const allItemsCart = (store: RootState) => store.cart.itemsCart;

export const {
  addNewProduct,
  minusOneProduct,
  plusOneProduct,
  minusAllProducts,
  totalPrice,
  setSubtotalArray,
  clearCart,
  setCartArray,
  setItemsCart,
} = cartSlice.actions;

export default cartSlice.reducer;
