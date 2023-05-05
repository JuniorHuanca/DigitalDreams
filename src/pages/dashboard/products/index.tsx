import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "@/state/api";
import Header from "@/components/Dashboard/Header";
import Product from "@/components/Product/Product";
import Loader from "@/components/Loaders/Loader";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import { useSelector } from "react-redux";
import { selectCurrentPage } from "@/state/globalSlice";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Navbar/Filters";

interface IData {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  stock: number;
  ProductStat: any;
}

type Props = {};

const Products = (props: Props) => {
  const { data, isLoading } = useGetProductsQuery(null);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const itemsPerPage = 24;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <LayoutDashboard>
      <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See your list of products" />
        {/* <Filters title="Products" /> */}
        {data || !isLoading ? (
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
                category,
                stock,
                ProductStat,
              }: IData) => (
                <Product
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={stock}
                  ProductStat={ProductStat}
                  image={image}
                />
              )
            )}
          </Box>
        ) : (
          <Box height="80vh">
            <Loader />
          </Box>
        )}
        <Pagination
          items={data}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </Box>
    </LayoutDashboard>
  );
};

export default Products;
