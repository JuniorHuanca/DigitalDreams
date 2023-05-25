import axios from "axios";

export const getDataApi = () => axios.get(`/api/data`);

export const postDataApi = () => axios.post(`/api/data`);
