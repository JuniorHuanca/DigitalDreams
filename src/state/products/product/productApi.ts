import axios from "axios";

export const getProductByApi = (id: string) => axios.get(`/api/products/${id}`)
export const getReviewsProductByApi = (id: string) => axios.get(`/api/review?productId=${id}`)
export const postReviewApi = (productId: number, userId: string, description: string, rating: number) => axios.post(`/api/review`, { productId, userId, description, rating })
export const deleteReviewApi = (reviewId: number) => axios.delete(`/api/review?reviewId=${reviewId}`)
export const putReviewApi = (reviewId: number, description: string, rating: number) => axios.put(`/api/review`, { reviewId, description, rating })
