import { IProductCart } from "@/shared/util/types";
import axios from "axios";

// export const postTransationApi = (checkoutSession: any, cart: IProductCart[]) =>
//   axios.post(`/api/test`, { checkoutSession, cart });

export const postTransationApi = (checkoutSession: any, cart: IProductCart[]) =>
  axios.post(`/api/transaction`, { checkoutSession, cart });
