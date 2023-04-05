import axios from "axios";

export const getProductByApi = (id: string) => axios.get(`/api/products/${id}`)
