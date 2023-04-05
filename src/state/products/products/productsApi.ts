import axios from "axios";

export const getProductsRecommendedByApi = () => axios.get(`/api/products?recommended=true`)
export const getProductsBrandByApi = (brand: string) => axios.get(`/api/products?brand=${brand}`)