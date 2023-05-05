import { useState } from "react";
import { ITheme } from "@/shared/util/types";
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

type Props = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  supply: number;
  ProductStat: any;
};
const Product = ({
  id,
  image,
  name,
  description,
  price,
  rating,
  category,
  supply,
  ProductStat,
}: Props) => {
  const theme: ITheme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.primary[100]}
          fontWeight="bold"
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div" className="h-28">
          {name}
        </Typography>
        <img src={image} alt={name} className="w-full h-52" />
        <Typography
          fontWeight="bold"
          sx={{ mb: "1.5rem" }}
          color={theme.palette.primary[100]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
      </CardContent>
      <CardActions>
        <button
          className="uppercase text-xs hover:bg-slate-400 hover:border-[1px] p-2 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography variant="body2">Description: {description}</Typography>
          <Typography>id: {id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {ProductStat?.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {ProductStat?.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default Product;
