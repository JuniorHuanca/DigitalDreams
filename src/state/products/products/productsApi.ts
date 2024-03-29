import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/products`);
export const getProductsDashboardByApi = () =>
  axios.get(`/api/dashboard/client/products`);
export const getRemovedProductsDashboardByApi = () =>
  axios.get(`/api/dashboard/client/products?deleted=true`);
export const getProductsRecommendedByApi = () =>
  axios.get(`/api/products?recommended=true`);
export const getProductsBrandsByApi = () =>
  axios.get(`/api/products?brands=true`);
export const getProductsMostSellingByApi = () =>
  axios.get(`/api/products?mostSelling=true`);
export const getProductsBrandByApi = (brand: string) =>
  axios.get(`/api/products?brand=${brand}`);
export const getProductsRelatedByApi = (name: string, id: number) =>
  axios.get(`/api/products?related=${name}&&id=${id}`);
export const getCategoriesByApi = () =>
  axios.get(`/api/products?categories=true`);
export const getProductsCategoryByApi = (name: string) =>
  axios.get(`/api/products?category=${name}`);
export const getBrandsByApi = () => axios.get(`/api/products?allBrands=true`);
