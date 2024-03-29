import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IPdashboard, IProduct } from "@/shared/util/types";
import {
  getProductsBrandByApi,
  getProductsBrandsByApi,
  getProductsByApi,
  getProductsRecommendedByApi,
  getProductsMostSellingByApi,
  getProductsRelatedByApi,
  getCategoriesByApi,
  getProductsCategoryByApi,
  getBrandsByApi,
  getProductsDashboardByApi,
  getRemovedProductsDashboardByApi,
} from "./productsApi";
import { RootState } from "@/state/store";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsDashboard = createAsyncThunk(
  "products/getAllProductsDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsDashboardByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllRemovedProductsDashboard = createAsyncThunk(
  "products/getAllRemovedProductsDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRemovedProductsDashboardByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsRecommended = createAsyncThunk(
  "products/getAllProductsRecommended",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsRecommendedByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsBrands = createAsyncThunk(
  "products/getAllProductsBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsBrandsByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsMostSelling = createAsyncThunk(
  "products/getAllProductsMostSelling",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsMostSellingByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsBrand = createAsyncThunk(
  "products/getAllProductsBrand",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await getProductsBrandByApi(name);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsRelated = createAsyncThunk(
  "products/getAllProductsRelated",
  async ({ name, id }: { name: string; id: number }, { rejectWithValue }) => {
    try {
      const response = await getProductsRelatedByApi(name, id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "products/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoriesByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "products/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBrandsByApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProductsCategory = createAsyncThunk(
  "products/getAllProductsCategory",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await getProductsCategoryByApi(name);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface IProductsState {
  products: IProduct[];
  productsDashboard: IPdashboard[];
  removedProductsDashboard: IPdashboard[];
  allItems: IProduct[];
  productsBySearch: IProduct[];
  productsCategory: IProduct[];
  categories: [];
  allItemsSecond: [];
  brands: [];
  filters: any;
  productsBrand: IProduct[];
  productsBrands: IProduct[];
  productsMostSelling: IProduct[];
  productsRecommended: IProduct[];
  productsRelateds: IProduct[];
  allProductsStatus: EStateGeneric;
  allProductsStatusDashboard: EStateGeneric;
  allRemovedProductsStatusDashboard: EStateGeneric;
  allProductsStatusCategory: EStateGeneric;
  allProductsStatusBrand: EStateGeneric;
  allProductsStatusBrands: EStateGeneric;
  allProductsStatusMostSelling: EStateGeneric;
  allProductsStatusRecommended: EStateGeneric;
  allProductsStatusRelateds: EStateGeneric;
  allProductsStatusSearch: EStateGeneric;
}
const initialState = {
  products: [],
  productsDashboard: [],
  removedProductsDashboard: [],
  allItems: [],
  productsBySearch: [],
  productsCategory: [],
  categories: [],
  allItemsSecond: [],
  brands: [],
  filters: {},
  productsBrand: [],
  productsBrands: [],
  productsMostSelling: [],
  productsRecommended: [],
  productsRelateds: [],
  allProductsStatus: EStateGeneric.IDLE,
  allProductsStatusDashboard: EStateGeneric.IDLE,
  allRemovedProductsStatusDashboard: EStateGeneric.IDLE,
  allProductsStatusCategory: EStateGeneric.IDLE,
  allProductsStatusBrand: EStateGeneric.IDLE,
  allProductsStatusBrands: EStateGeneric.IDLE,
  allProductsStatusMostSelling: EStateGeneric.IDLE,
  allProductsStatusRecommended: EStateGeneric.IDLE,
  allProductsStatusRelateds: EStateGeneric.IDLE,
  allProductsStatusSearch: EStateGeneric.IDLE,
} as IProductsState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProducts: (state) => {
      return {
        ...state,
        products: [],
        allProductsStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsDashboard: (state) => {
      return {
        ...state,
        productsDashboard: [],
        allProductsStatusDashboard: EStateGeneric.IDLE,
      };
    },
    cleanUpRemovedProductsDashboard: (state) => {
      return {
        ...state,
        removedProductsDashboard: [],
        allRemovedProductsStatusDashboard: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsRecommended: (state) => {
      return {
        ...state,
        productsRecommended: [],
        allProductsStatusRecommended: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsBrand: (state) => {
      return {
        ...state,
        productsBrand: [],
        allProductsStatusBrand: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsMostSelling: (state) => {
      return {
        ...state,
        productsMostSelling: [],
        allProductsStatusMostSelling: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsRelated: (state) => {
      return {
        ...state,
        productsRelateds: [],
        allProductsStatusRelateds: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsCategory: (state) => {
      return {
        ...state,
        productsCategory: [],
        allProductsStatusCategory: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsSearch: (state) => {
      return {
        ...state,
        productsBySearch: [],
        allProductsStatusSearch: EStateGeneric.IDLE,
      };
    },
    setFilters: (state, action) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
    orderAlphabetically: (state, action) => {
      const arrayState = state[action.payload.array as keyof IProductsState];
      if (Array.isArray(arrayState)) {
        const filters =
          action.payload.value === "atoz"
            ? [...arrayState].sort((a: IProduct, b: IProduct) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                else return -1;
              })
            : [...arrayState].sort((a: IProduct, b: IProduct) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                else return -1;
              });
        return {
          ...state,
          [action.payload.array as keyof IProductsState]: filters,
        };
      }
    },
    sortPrices: (state, action) => {
      const arrayState = state[action.payload.array as keyof IProductsState];
      if (Array.isArray(arrayState)) {
        const filters =
          action.payload.value === "lowest"
            ? [...arrayState].sort((a: IProduct, b: IProduct) => {
                if (a.price > b.price) return 1;
                else return -1;
              })
            : [...arrayState].sort((a: IProduct, b: IProduct) => {
                if (a.price < b.price) return 1;
                else return -1;
              });
        return {
          ...state,
          [action.payload.array as keyof IProductsState]: filters,
        };
      }
    },
    filterByBrand: (state, action) => {
      const arrayState = state.allItems.length
        ? state.allItems
        : state[action.payload.array as keyof IProductsState];
      if (Array.isArray(arrayState)) {
        const filters =
          action.payload.value === "all"
            ? arrayState
            : [...arrayState].filter(
                (e: IProduct) => e.brand.name === action.payload.value
              );
        return {
          ...state,
          allItems: arrayState,
          [action.payload.array as keyof IProductsState]: filters,
        };
      }
    },
    filterByCategory: (state, action) => {
      const arrayState = state.allItems.length
        ? state.allItems
        : state[action.payload.array as keyof IProductsState];
      if (Array.isArray(arrayState)) {
        const filters =
          action.payload.value === "all"
            ? arrayState
            : [...arrayState].filter(
                (e: IProduct) =>
                  e.subcategory.category.name === action.payload.value
              );
        return {
          ...state,
          allItems: arrayState,
          [action.payload.array as keyof IProductsState]: filters,
        };
      }
    },
    orderByFilter(state, action) {
      const arrayState = state.allItems.length
        ? state.allItems
        : state[action.payload.array as keyof IProductsState];
      if (Array.isArray(arrayState)) {
        if (
          state.filters.category === action.payload.value ||
          action.payload.value === "all"
        ) {
          const filters =
            action.payload.value === "all"
              ? arrayState
              : [...arrayState].filter(
                  (e: IProduct) =>
                    e.subcategory.category.name === action.payload.value
                );
          const brands = filters.reduce(
            (acc: { id: number; name: string }[], curr: IProduct) => {
              if (!acc.some((brand) => brand.id === curr.brand.id)) {
                acc.push(curr.brand);
              }
              return acc;
            },
            []
          );
          return {
            ...state,
            allItems: arrayState,
            allItemsSecond: brands,
            brands,
            [action.payload.array as keyof IProductsState]: filters,
          };
        }
        if (state.filters.brand && action.payload.value === "allBrand") {
          const filters = [...arrayState].filter(
            (e: IProduct) =>
              e.subcategory.category.name === state.filters.category
          );
          return {
            ...state,
            [action.payload.array as keyof IProductsState]: filters,
          };
        }
        if (state.filters.brand) {
          if (state.allItemsSecond.length) {
            const filters = [...arrayState].filter(
              (e: IProduct) =>
                e.brand.name === action.payload.value &&
                e.subcategory.category.name === state.filters.category
            );
            return {
              ...state,
              [action.payload.array as keyof IProductsState]: filters,
            };
          }
        }
      }
    },
    setProductsBysearch(state, action) {
      const { products, search } = action.payload;
      if (search.length > 2) {
        const filtered = products.filter((e: IProduct) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        );
        const sorted = [...filtered].sort((a: IProduct, b: IProduct) => {
          if (a.rating < b.rating) return 1;
          else return -1;
        });
        if (sorted.length) {
          return {
            ...state,
            productsBySearch: sorted,
            allProductsStatusSearch: EStateGeneric.SUCCEEDED,
          };
        } else {
          return {
            ...state,
            productsBySearch: [],
            allProductsStatusSearch: EStateGeneric.FAILED,
          };
        }
      } else {
        return {
          ...state,
          productsBySearch: [],
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.allProductsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.allProductsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.allProductsStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsDashboard.fulfilled, (state, action) => {
      state.productsDashboard = action.payload;
      state.allProductsStatusDashboard = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsDashboard.pending, (state, action) => {
      state.allProductsStatusDashboard = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsDashboard.rejected, (state, action) => {
      state.allProductsStatusDashboard = EStateGeneric.FAILED;
    });

    builder.addCase(getAllRemovedProductsDashboard.fulfilled, (state, action) => {
      state.removedProductsDashboard = action.payload;
      state.allRemovedProductsStatusDashboard = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllRemovedProductsDashboard.pending, (state, action) => {
      state.allRemovedProductsStatusDashboard = EStateGeneric.PENDING;
    });
    builder.addCase(getAllRemovedProductsDashboard.rejected, (state, action) => {
      state.allRemovedProductsStatusDashboard = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsRecommended.fulfilled, (state, action) => {
      state.productsRecommended = action.payload.products;
      state.allProductsStatusRecommended = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsRecommended.pending, (state, action) => {
      state.allProductsStatusRecommended = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsRecommended.rejected, (state, action) => {
      state.allProductsStatusRecommended = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsBrands.fulfilled, (state, action) => {
      state.productsBrands = action.payload.products;
      state.allProductsStatusBrands = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsBrands.pending, (state, action) => {
      state.allProductsStatusBrands = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsBrands.rejected, (state, action) => {
      state.allProductsStatusBrands = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsMostSelling.fulfilled, (state, action) => {
      state.productsMostSelling = action.payload.products;
      state.allProductsStatusMostSelling = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsMostSelling.pending, (state, action) => {
      state.allProductsStatusMostSelling = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsMostSelling.rejected, (state, action) => {
      state.allProductsStatusMostSelling = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsBrand.fulfilled, (state, action) => {
      state.productsBrand = action.payload.products;
      state.allProductsStatusBrand = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsBrand.pending, (state, action) => {
      state.allProductsStatusBrand = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsBrand.rejected, (state, action) => {
      state.allProductsStatusBrand = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsRelated.fulfilled, (state, action) => {
      state.productsRelateds = action.payload.products;
      state.allProductsStatusRelateds = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsRelated.pending, (state, action) => {
      state.allProductsStatusRelateds = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsRelated.rejected, (state, action) => {
      state.allProductsStatusRelateds = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsCategory.fulfilled, (state, action) => {
      state.productsCategory = action.payload.products;
      state.allProductsStatusCategory = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsCategory.pending, (state, action) => {
      state.allProductsStatusCategory = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsCategory.rejected, (state, action) => {
      state.allProductsStatusCategory = EStateGeneric.FAILED;
    });

    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(getAllCategories.pending, (state, action) => {});
    builder.addCase(getAllCategories.rejected, (state, action) => {});

    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
    });
    builder.addCase(getAllBrands.pending, (state, action) => {});
    builder.addCase(getAllBrands.rejected, (state, action) => {});
  },
});

export default productsSlice.reducer;

export const allProducts = (store: RootState) => store.products.products;
export const allProductsDashboard = (store: RootState) =>
  store.products.productsDashboard;
export const allRemovedProductsDashboard = (store: RootState) =>
  store.products.removedProductsDashboard;
export const allProductsRecommended = (store: RootState) =>
  store.products.productsRecommended;
export const allProductsBrand = (store: RootState) =>
  store.products.productsBrand;
export const allProductsBrands = (store: RootState) =>
  store.products.productsBrands;
export const allProductsMostSelling = (store: RootState) =>
  store.products.productsMostSelling;
export const allProductsRelateds = (store: RootState) =>
  store.products.productsRelateds;
export const allCategories = (store: RootState) => store.products.categories;
export const allProductsCategory = (store: RootState) =>
  store.products.productsCategory;
export const allBrands = (store: RootState) => store.products.brands;
export const allFilters = (store: RootState) => store.products.filters;
export const allProductsBySearch = (store: RootState) =>
  store.products.productsBySearch;

export const {
  cleanUpProductsRecommended,
  cleanUpProductsBrand,
  cleanUpProducts,
  cleanUpProductsDashboard,
  cleanUpRemovedProductsDashboard,
  cleanUpProductsMostSelling,
  cleanUpProductsRelated,
  cleanUpProductsCategory,
  orderAlphabetically,
  setFilters,
  sortPrices,
  filterByBrand,
  filterByCategory,
  orderByFilter,
  setProductsBysearch,
  cleanUpProductsSearch,
} = productsSlice.actions;

export const selectAllProductsStatus = (state: RootState) =>
  state.products.allProductsStatus;
export const selectAllProductsStatusDashboard = (state: RootState) =>
  state.products.allProductsStatusDashboard;
export const selectAllRemovedProductsStatusDashboard = (state: RootState) =>
  state.products.allRemovedProductsStatusDashboard;
export const selectAllProductsRecommendedStatus = (state: RootState) =>
  state.products.allProductsStatusRecommended;
export const selectAllProductsBrandStatus = (state: RootState) =>
  state.products.allProductsStatusBrand;
export const selectAllProductsBrandsStatus = (state: RootState) =>
  state.products.allProductsStatusBrands;
export const selectAllProductsMostSellingStatus = (state: RootState) =>
  state.products.allProductsStatusMostSelling;
export const selectAllProductsRelatedsStatus = (state: RootState) =>
  state.products.allProductsStatusRelateds;
export const selectAllProductsCategoriesStatus = (state: RootState) =>
  state.products.allProductsStatusCategory;
export const selectAllProductsSearchStatus = (state: RootState) =>
  state.products.allProductsStatusSearch;
