import Header from "../Header";
import NotFound from "@/assets/404Products.gif";
import NotFoundMobile from "@/assets/404MobileProducts.gif";
import NotFoundDark from "@/assets/404ProductsDark.gif";
import NotFoundDarkMobile from "@/assets/404MobileProductsDark.gif";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Navbar/Filters";
import Image from "next/image";
import { useEffect } from "react";
import { EStateGeneric, ITheme } from "@/shared/util/types";
import {
  allRemovedProductsDashboard,
  cleanUpRemovedProductsDashboard,
  getAllRemovedProductsDashboard,
  selectAllRemovedProductsStatusDashboard,
} from "@/state/products/products/productsSlice";
import { selectCurrentPage } from "@/state/globalSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useMediaQuery from "@/shared/util/useMediaQuery";
import { Box, useTheme } from "@mui/material";
import Product from "@/components/Dashboard/Products/Product/Product";
import Loader from "@/components/Loaders/Loader";
import { useAppDispatch } from "@/state/store";
import { BiMessageAltError } from "react-icons/bi";
type Props = {};

const RemovedProducts = (props: Props) => {
  const theme: ITheme = useTheme();
  const { mode } = theme.palette;
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productsStatus = useSelector(selectAllRemovedProductsStatusDashboard);
  const products = useSelector(allRemovedProductsDashboard);
  const isEmpty = products.length === 0;
  const itemsPerPage = 24;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (productsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllRemovedProductsDashboard());
        }
      }
    })();

    return () => {
      dispatch(cleanUpRemovedProductsDashboard());
    };
  }, []);
  return (
    <div>
      <Header
        title="REMOVED PRODUCTS"
        subtitle="See your list of removed products"
      />
      {productsStatus === EStateGeneric.SUCCEEDED && !isEmpty && (
        <>
          <Filters title="removedProductsDashboard" />
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {currentItems.map(
              ({
                id,
                image,
                name,
                description,
                price,
                rating,
                subcategory,
                stock,
                ProductStat,
                brand,
                deleted,
              }) => (
                <Product
                  key={id}
                  id={id}
                  name={name}
                  brand={brand}
                  subcategory={subcategory}
                  description={description}
                  price={price}
                  rating={rating}
                  // category={category}
                  stock={stock}
                  ProductStat={ProductStat}
                  image={image}
                  deleted={deleted}
                />
              )
            )}
          </Box>
          <Pagination
            items={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </>
      )}
      {productsStatus === EStateGeneric.SUCCEEDED && isEmpty && (
        <div className="flex flex-col justify-center items-center p-4 gap-4 sm:gap-2">
          <p className="text-5xl sm:text-8xl">
            <BiMessageAltError />
          </p>
          <h2 className="text-center text-4xl sm:text-5xl sm:text-start font-semibold">
            There are no products removed
          </h2>
        </div>
      )}
      {productsStatus === EStateGeneric.PENDING && (
        <div className="relative w-full h-[70vh] flex justify-center items-center">
          <Loader />
        </div>
      )}
      {productsStatus === EStateGeneric.FAILED && (
        <div className="relative w-full h-[70vh] flex justify-center items-center">
          {mode === "dark" && (
            <Image
              src={isAboveSmallScreens ? NotFoundDark : NotFoundDarkMobile}
              alt="Error"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          )}
          {mode !== "dark" && (
            <Image
              src={isAboveSmallScreens ? NotFound : NotFoundMobile}
              alt="Error"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RemovedProducts;
