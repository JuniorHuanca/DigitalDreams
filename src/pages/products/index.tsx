import {
  allProducts,
  cleanUpProducts,
  getAllProducts,
  selectAllProductsStatus,
} from "@/state/products/products/productsSlice";
import { useAppDispatch } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useRouter } from "next/router";
import { EStateGeneric } from "@/shared/util/types";
import Loader from "../../components/Loaders/Loader";
import Layout from "@/components/Layouts/Layout";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Navbar/Filters";
import { BiArrowBack } from "react-icons/bi";
import { selectCurrentPage } from "@/state/globalSlice";

type Props = {};

const Products = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productsStatus = useSelector(selectAllProductsStatus);
  const products = useSelector(allProducts);

  const itemsPerPage = 10;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (productsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllProducts());
        }
      }
    })();

    return () => {
        dispatch(cleanUpProducts());
    };
  }, []);
  return (
    <Layout title={"Products - Digital Dreams"}>
      <Filters title="Products" />
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
        {products.length ? (
          currentItems.map((e, index) => <Card key={index} product={e} />)
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
      <Pagination
        items={products}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </Layout>
  );
};

export default Products;
