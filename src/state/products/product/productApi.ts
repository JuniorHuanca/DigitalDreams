import axios from "axios";

export const getProductByApi = (id: string) => axios.get(`/api/products/${id}`)
export const getReviewsProductByApi = (id: string) => axios.get(`/api/review?product_id=${id}`)
export const postReviewApi = (product_id: number, user_id: string, description: string, rating: number) => axios.post(`/api/review`, { product_id, user_id, description, rating })
