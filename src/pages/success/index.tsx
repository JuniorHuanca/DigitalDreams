import { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "@/shared/util/confetti";
import Layout from "@/components/Layouts/Layout";
import { useAppDispatch } from "@/state/store";
import { handleClickModal, setAllModals } from "@/state/globalSlice";
import {
  allProductsCart,
  clearCart,
  setItemsCart,
} from "@/state/cart/cartSlice";
import { useSelector } from "react-redux";
import { postTransationApi } from "@/state/cart/cartApi";
import { useRouter } from "next/router";
type Props = {};
const Success = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cart = useSelector(allProductsCart);

  useEffect(() => {
    dispatch(setAllModals());
    (async () => {
      if (router.isReady) {
        const { checkoutSession } = router.query;
        await postTransationApi(checkoutSession, cart);
        localStorage.clear();
        dispatch(clearCart());
        dispatch(setItemsCart(0));
        runFireworks();
      }
    })();
  }, [router.query.checkoutSession]);

  return (
    <Layout title={"successful purchase"}>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center p-4 gap-4 sm:gap-2 dark:bg-primary-500 bg-white">
          <p className="text-5xl sm:text-8xl">
            <BsBagCheckFill />
          </p>
          <h2 className="text-center text-4xl sm:text-5xl sm:text-start font-semibold">
            Thank you for your order!
          </h2>
          <p className="text-lg sm:text-lg">
            Check your email inbox for the receipt.
          </p>
          <p className="text-lg sm:text-lg">
            If you have any questions, please email{" "}
            <Link
              className="text-lg sm:text-lg font-semibold"
              href="mailto:JHuanca_21@outlook.com"
            >
              JHuanca_21@outlook.com
            </Link>
          </p>
          <Link href="/">
            <button
              type="button"
              className="p-2 dark:bg-primary-600 bg-slate-200"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Success;