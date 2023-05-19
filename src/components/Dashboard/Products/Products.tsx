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
  allProductsDashboard,
  cleanUpProductsDashboard,
  getAllProductsDashboard,
  selectAllProductsStatusDashboard,
} from "@/state/products/products/productsSlice";
import { selectCurrentPage } from "@/state/globalSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useMediaQuery from "@/shared/util/useMediaQuery";
import { Box, useTheme } from "@mui/material";
import Product from "@/components/Dashboard/Products/Product/Product";
import Loader from "@/components/Loaders/Loader";
import { useAppDispatch } from "@/state/store";
type Props = {};

const Products = (props: Props) => {
  const theme: ITheme = useTheme();
  const { mode } = theme.palette;
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productsStatus = useSelector(selectAllProductsStatusDashboard);
  const products = useSelector(allProductsDashboard);

  const itemsPerPage = 24;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (productsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllProductsDashboard());
        }
      }
    })();

    return () => {
      dispatch(cleanUpProductsDashboard());
    };
  }, []);
  return (
    <div>
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {productsStatus === EStateGeneric.SUCCEEDED && (
        <>
          <Filters title="productsDashboard" />
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
                subcategory: { category },
                stock,
                ProductStat,
                deleted,
              }) => (
                <Product
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category.name}
                  supply={stock}
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
              priority={true}
            />
          )}
          {mode !== "dark" && (
            <Image
              src={isAboveSmallScreens ? NotFound : NotFoundMobile}
              alt="Error"
              fill
              priority={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
