import axios from "axios";

export const getFavoritesUserByApi = (userId: string) =>
  axios.get(`/api/favorite?userId=${userId}`);
