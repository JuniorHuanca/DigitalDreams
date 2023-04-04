import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/products`)