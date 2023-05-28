import axios from "axios";

export const getFavoritesUserByApi = (userId: string) =>
  axios.get(`/api/favorite?userId=${userId}`);

export const getReviewsUserByApi = (userId: string) =>
  axios.get(`/api/review?userId=${userId}`);

export const getFavoriteUserByApi = (userId: string, productId: number) =>
  axios.get(`/api/favorite?userId=${userId}&productId=${productId}`);

export const postFavoriteUserByApi = (userId: string, productId: number) =>
  axios.post(`/api/favorite?userId=${userId}&productId=${productId}`);

export const deleteFavoritesUserByApi = (userId: string, productId: number) =>
  axios.delete(`/api/favorite?userId=${userId}&productId=${productId}`);
