import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IProduct } from "@/shared/util/types";
import { getProductsBrandByApi, getProductsBrandsByApi, getProductsByApi, getProductsRecommendedByApi, getProductsMostSellingByApi, getProductsRelatedByApi } from "./productsApi";
import { RootState } from "@/state/store";

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsByApi()
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllProductsRecommended = createAsyncThunk(
    'products/getAllProductsRecommended',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsRecommendedByApi()
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllProductsBrands = createAsyncThunk(
    'products/getAllProductsBrands',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsBrandsByApi()
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllProductsMostSelling = createAsyncThunk(
    'products/getAllProductsMostSelling',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsMostSellingByApi()
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllProductsBrand = createAsyncThunk(
    'products/getAllProductsBrand',
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await getProductsBrandByApi(name)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllProductsRelated = createAsyncThunk(
    'products/getAllProductsRelated',
    async ({ name, id }: { name: string, id: number }, { rejectWithValue }) => {
        try {
            const response = await getProductsRelatedByApi(name, id)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
interface IProductsState {
    products: IProduct[],
    productsBrand: IProduct[],
    productsBrands: IProduct[],
    productsMostSelling: IProduct[],
    productsRecommended: IProduct[],
    productsRelateds: IProduct[],
    allProductsStatus: EStateGeneric,
    allProductsStatusBrand: EStateGeneric,
    allProductsStatusBrands: EStateGeneric,
    allProductsStatusMostSelling: EStateGeneric,
    allProductsStatusRecommended: EStateGeneric,
    allProductsStatusRelateds: EStateGeneric,
}
const initialState = {
    products: [],
    productsBrand: [],
    productsBrands: [],
    productsMostSelling: [],
    productsRecommended: [],
    productsRelateds: [],
    allProductsStatus: EStateGeneric.IDLE,
    allProductsStatusBrand: EStateGeneric.IDLE,
    allProductsStatusBrands: EStateGeneric.IDLE,
    allProductsStatusMostSelling: EStateGeneric.IDLE,
    allProductsStatusRecommended: EStateGeneric.IDLE,
    allProductsStatusRelateds: EStateGeneric.IDLE,
} as IProductsState;

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProducts: (state) => {
            return {
                ...state,
                products: [],
                allProductsStatus: EStateGeneric.IDLE
            }
        },
        cleanUpProductsRecommended: (state) => {
            return {
                ...state,
                productsRecommended: [],
                allProductsStatusRecommended: EStateGeneric.IDLE
            }
        },
        cleanUpProductsBrand: (state) => {
            return {
                ...state,
                productsBrand: [],
                allProductsStatusBrand: EStateGeneric.IDLE
            }
        },
        cleanUpProductsMostSelling: (state) => {
            return {
                ...state,
                productsMostSelling: [],
                allProductsStatusMostSelling: EStateGeneric.IDLE
            }
        },
        cleanUpProductsRelated: (state) => {
            return {
                ...state,
                productsRelateds: [],
                allProductsStatusRelateds: EStateGeneric.IDLE
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.allProductsStatus = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.allProductsStatus = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.allProductsStatus = EStateGeneric.FAILED;
        })

        builder.addCase(getAllProductsRecommended.fulfilled, (state, action) => {
            state.productsRecommended = action.payload.products;
            state.allProductsStatusRecommended = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsRecommended.pending, (state, action) => {
            state.allProductsStatusRecommended = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsRecommended.rejected, (state, action) => {
            state.allProductsStatusRecommended = EStateGeneric.FAILED;
        })

        builder.addCase(getAllProductsBrands.fulfilled, (state, action) => {
            state.productsBrands = action.payload.products;
            state.allProductsStatusBrands = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsBrands.pending, (state, action) => {
            state.allProductsStatusBrands = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsBrands.rejected, (state, action) => {
            state.allProductsStatusBrands = EStateGeneric.FAILED;
        })

        builder.addCase(getAllProductsMostSelling.fulfilled, (state, action) => {
            state.productsMostSelling = action.payload.products;
            state.allProductsStatusMostSelling = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsMostSelling.pending, (state, action) => {
            state.allProductsStatusMostSelling = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsMostSelling.rejected, (state, action) => {
            state.allProductsStatusMostSelling = EStateGeneric.FAILED;
        })

        builder.addCase(getAllProductsBrand.fulfilled, (state, action) => {
            state.productsBrand = action.payload.products;
            state.allProductsStatusBrand = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsBrand.pending, (state, action) => {
            state.allProductsStatusBrand = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsBrand.rejected, (state, action) => {
            state.allProductsStatusBrand = EStateGeneric.FAILED;
        })

        builder.addCase(getAllProductsRelated.fulfilled, (state, action) => {
            state.productsRelateds = action.payload.products;
            state.allProductsStatusRelateds = EStateGeneric.SUCCEEDED;
        })
        builder.addCase(getAllProductsRelated.pending, (state, action) => {
            state.allProductsStatusRelateds = EStateGeneric.PENDING;
        })
        builder.addCase(getAllProductsRelated.rejected, (state, action) => {
            state.allProductsStatusRelateds = EStateGeneric.FAILED;
        })
    },
});

export default productsSlice.reducer;

export const allProducts = (store: RootState) => store.products.products
export const allProductsRecommended = (store: RootState) => store.products.productsRecommended
export const allProductsBrand = (store: RootState) => store.products.productsBrand
export const allProductsBrands = (store: RootState) => store.products.productsBrands
export const allProductsMostSelling = (store: RootState) => store.products.productsMostSelling
export const allProductsRelateds = (store: RootState) => store.products.productsRelateds

export const {
    cleanUpProductsRecommended,
    cleanUpProductsBrand,
    cleanUpProducts,
    cleanUpProductsMostSelling,
    cleanUpProductsRelated,
} = productsSlice.actions;

export const selectAllProductsStatus = (state: { products: { allProductsStatus: EStateGeneric; }; }) => state.products.allProductsStatus
export const selectAllProductsRecommendedStatus = (state: { products: { allProductsStatusRecommended: EStateGeneric; }; }) => state.products.allProductsStatusRecommended
export const selectAllProductsBrandStatus = (state: { products: { allProductsStatusBrand: EStateGeneric; }; }) => state.products.allProductsStatusBrand
export const selectAllProductsBrandsStatus = (state: { products: { allProductsStatusBrands: EStateGeneric; }; }) => state.products.allProductsStatusBrands
export const selectAllProductsMostSellingStatus = (state: { products: { allProductsStatusMostSelling: EStateGeneric; }; }) => state.products.allProductsStatusMostSelling
export const selectAllProductsRelatedsStatus = (state: { products: { allProductsStatusRelateds: EStateGeneric; }; }) => state.products.allProductsStatusRelateds