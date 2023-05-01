import axios from "axios";

export const getTransactionApi = (checkoutSession: string) =>
  axios.get(
    `${process.env.BASE_URL}/api/transaction?checkoutSession=${checkoutSession}`
  );
