import { useEffect, useState } from "react";
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
import { getTransactionApi } from "@/state/transaction/transactionApi";
type Props = {};
const Success = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cart = useSelector(allProductsCart);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    runFireworks();
    dispatch(setAllModals());
  }, [router.query.checkoutSession]);

  useEffect(() => {
    if (mounted) {
      const { checkoutSession } = router.query;
      (async () => {
        const response = await postTransationApi(checkoutSession, cart);
        console.log(response);
        if (response.data.success) {
          dispatch(setItemsCart(0));
          localStorage.clear();
          dispatch(clearCart());
        }
      })();
    }
  }, [mounted]);
  if (!mounted) {
    return null;
  }
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

export async function getServerSideProps(context: any) {
  const { checkoutSession } = context.query;
  const res = await getTransactionApi(checkoutSession);
  console.log(res.data);
  if (res.data.transaction) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default Success;
