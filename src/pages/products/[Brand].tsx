import {
  allProductsBrand,
  cleanUpProductsBrand,
  getAllProductsBrand,
  selectAllProductsBrandStatus,
} from "@/state/products/products/productsSlice";
import { useAppDispatch } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useRouter } from "next/router";
import { EStateGeneric } from "@/shared/util/types";
import Loader from "../../components/Loaders/Loader";
import Layout from "@/components/Layouts/Layout";
import { BiArrowBack } from "react-icons/bi";

type Props = {};

const Brand = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productsStatus = useSelector(selectAllProductsBrandStatus);
  const products = useSelector(allProductsBrand);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { name } = router.query;
        if (productsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllProductsBrand(name as string));
        }
      }
    })();

    return () => {
      dispatch(cleanUpProductsBrand());
    };
  }, [router.query.name]);
  return (
    <Layout tittle={`${router.query.name as string} - Digital Dreams`}>
      <button
        onClick={() => {
          router.back();
        }}
        className="self-start ml-6 my-2 px-2 pt-2 text-lg dark:border-white hover:animate-pulse border-black border-b-2 transition-all font-semibold flex items-center gap-1"
      >
        <BiArrowBack />
        Go back
      </button>
      <div className="w-full min-h-[80vh] flex flex-wrap justify-center gap-4">
        {productsStatus === EStateGeneric.SUCCEEDED &&
          products.map((e, index) => <Card key={index} product={e} />)}
        {productsStatus === EStateGeneric.PENDING && (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Brand;
