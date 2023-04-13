import axios from "axios";

export const getProductByApi = (id: string) => axios.get(`/api/products/${id}`)
export const getReviewsProductByApi = (id: string) => axios.get(`/api/review?product_id=${id}`)
export const postReviewApi = (product_id: number, user_id: string, description: string, rating: number) => axios.post(`/api/review`, { product_id, user_id, description, rating })
export const deleteReviewApi = (review_id: number) => axios.delete(`/api/review?review_id=${review_id}`)
export const putReviewApi = (review_id: number, description: string, rating: number) => axios.put(`/api/review`, { review_id, description, rating })
