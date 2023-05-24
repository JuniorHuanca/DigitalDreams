import axios from "axios";

export const getReviewsWithReportsApi = () =>
  axios.get(`/api/dashboard/client/reports`);
