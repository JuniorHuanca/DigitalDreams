import {
  allProductsBrand,
  allProductsCategory,
  cleanUpProductsBrand,
  cleanUpProductsCategory,
  getAllProductsBrand,
  getAllProductsCategory,
  selectAllProductsBrandStatus,
  selectAllProductsCategoriesStatus,
} from "@/state/products/products/productsSlice";
import { useAppDispatch } from "@/state/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useRouter } from "next/router";
import { EStateGeneric } from "@/shared/util/types";
import Loader from "../../components/Loaders/Loader";
import Layout from "@/components/Layouts/Layout";
import { BiArrowBack } from "react-icons/bi";
import Pagination from "@/components/Pagination";
import { selectCurrentPage, setCurrentPage } from "@/state/globalSlice";

type Props = {};

const Brand = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productsStatus = useSelector(selectAllProductsBrandStatus);
  const products = useSelector(allProductsBrand);
  const productsCateogryStatus = useSelector(selectAllProductsCategoriesStatus);
  const productsCateogry = useSelector(allProductsCategory);

  const itemsPerPage = 10;
  const currentPage = useSelector(selectCurrentPage);

  // const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemsCategory = productsCateogry.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { name, category } = router.query;
        if (name) {
          if (productsStatus === EStateGeneric.IDLE) {
            await dispatch(getAllProductsBrand(name as string));
          }
        }
        if (category && category !== "brand") {
          if (productsCateogryStatus === EStateGeneric.IDLE) {
            await dispatch(getAllProductsCategory(category as string));
          }
        }
      }
      dispatch(setCurrentPage(1));
    })();

    return () => {
      if (router.query.category !== "brand") {
        dispatch(cleanUpProductsCategory());
      } else {
        dispatch(cleanUpProductsBrand());
      }
    };
  }, [router.query.name, router.query.category]);
  console.log(router.query.category);
  console.log(productsCateogry.length);
  console.log(productsCateogryStatus);
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
          currentItems.map((e, index) => <Card key={index} product={e} />)}
        {productsCateogryStatus === EStateGeneric.SUCCEEDED &&
          currentItemsCategory.map((e, index) => (
            <Card key={index} product={e} />
          ))}
        {productsStatus === EStateGeneric.PENDING && (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
        {productsCateogryStatus === EStateGeneric.PENDING && (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
      <Pagination
        items={
          productsStatus === EStateGeneric.SUCCEEDED
            ? products
            : productsCateogry
        }
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </Layout>
  );
};

export default Brand;
