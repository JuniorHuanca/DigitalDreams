import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/products`)
export const getProductsRecommendedByApi = () => axios.get(`/api/products?recommended=true`)
export const getProductsBrandsByApi = () => axios.get(`/api/products?brands=true`)
export const getProductsBrandByApi = (brand: string) => axios.get(`/api/products?brand=${brand}`)