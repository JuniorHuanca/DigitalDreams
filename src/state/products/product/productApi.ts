import axios from "axios";

export const getProductByApi = (id: string) => axios.get(`/api/products/${id}`);

export const getReviewsProductByApi = (id: string) =>
  axios.get(`/api/review?productId=${id}`);

export const postProductByApi = (
  name: string,
  price: string,
  description: string,
  stock: string,
  brand: string,
  subcategory: string,
  enable: boolean,
  image: any
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("stock", stock);
  formData.append("brand", brand);
  formData.append("subcategory", subcategory);
  formData.append("enable", enable.toString());
  formData.append("image", image);
  return axios.post(`/api/products/2121`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const patchProductByApi = (
  id: number,
  name: string,
  price: string,
  description: string,
  stock: string,
  brand: string,
  subcategory: string,
  enable: boolean,
  image: any
) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("stock", stock);
  formData.append("brand", brand);
  formData.append("subcategory", subcategory);
  formData.append("enable", enable.toString());
  formData.append("image", image);
  return axios.patch(`/api/products/2121`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postReportReviewApi = (
  userId: number,
  reason: string,
  reviewId: string,
) => axios.post(`/api/review?report=true`, { userId, reason, reviewId });

export const postReviewApi = (
  productId: number,
  userId: string,
  description: string,
  rating: number
) => axios.post(`/api/review`, { productId, userId, description, rating });

export const deleteReviewApi = (reviewId: number) =>
  axios.delete(`/api/review?reviewId=${reviewId}`);

export const putReviewApi = (
  reviewId: number,
  description: string,
  rating: number
) => axios.put(`/api/review`, { reviewId, description, rating });

export const deleteProductByApi = (id: number) =>
  axios.delete(`/api/products/${id}?deleted=true`);

export const deleteProductForEverByApi = (id: number) =>
  axios.delete(`/api/products/${id}`);

export const restoreProductByApi = (id: number) =>
  axios.patch(`/api/products/${id}?deleted=false`);

export const getBrandsNameByApi = () => axios.get(`/api/data?brandsQ=true`);

export const getSubcategoriasNameByApi = () =>
  axios.get(`/api/data?subcategoriesQ=true`);
