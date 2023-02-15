import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "@/state/api"
import Header from "@/components/Header";
import Product from "./Product";
import Loader from "@/components/Loaders/Loader";

interface IData {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  supply: number;
  stat: any;
}

type Props = {}

const Products = (props: Props) => {
  const { data, isLoading } = useGetProductsQuery(null);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      m="1.5rem 2.5rem"
    >
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data || !isLoading ? <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
        }}
      >
        {data.map(({
          _id,
          name,
          description,
          price,
          rating,
          category,
          supply,
          stat,
        }: IData) => (
          <Product
            key={_id}
            _id={_id}
            name={name}
            description={description}
            price={price}
            rating={rating}
            category={category}
            supply={supply}
            stat={stat}
          />
        ))}
      </Box>
        : <Box
          height="80vh"
        >
          <Loader />
        </Box>
      }
    </Box>
  )
}

export default Products