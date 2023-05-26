import axios from "axios";

export const getFavoritesUserByApi = (userId: string) =>
  axios.get(`/api/favorite?userId=${userId}`);

export const deleteFavoritesUserByApi = (userId: string, productId: number) =>
  axios.delete(`/api/favorite?userId=${userId}&productId=${productId}`);
