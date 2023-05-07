import axios from "axios";

export const getTransactionApi = (checkoutSession: string) =>
  axios.get(
    `/api/transaction?checkoutSession=${checkoutSession}`
  );
