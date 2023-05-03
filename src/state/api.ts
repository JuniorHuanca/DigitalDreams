import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = '/api'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id: string) => `dashboard/general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "dashboard/client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "dashboard/client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "dashboard/client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "dashboard/client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "dashboard/sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "dashboard/management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id: string) => `dashboard/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "dashboard/general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
