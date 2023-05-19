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
import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/state/store";
import {
  deleteOneProduct,
  deleteOneProductForEver,
  restoreOneProduct,
} from "@/state/products/product/productSlice";
import {
  getAllProductsDashboard,
  getAllRemovedProductsDashboard,
} from "@/state/products/products/productsSlice";

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
  deleted: boolean;
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
  deleted,
}: Props) => {
  const dispatch = useAppDispatch();
  const theme: ITheme = useTheme();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<any>(null);
  const [deleteModalForEver, setDeleteModalForEver] = useState<any>(null);
  const [restoreModal, setRestoreModal] = useState<any>(null);
  const handleDeleteForEver = async () => {
    try {
      const response: any = await dispatch(deleteOneProductForEver(id));
      if (response.payload.success) {
        toast.success("Product successfully deleted");
        await dispatch(getAllProductsDashboard());
        await dispatch(getAllRemovedProductsDashboard());
        setDeleteModal(null);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      const response: any = await dispatch(deleteOneProduct(id));
      if (response.payload.success) {
        toast.success("Product successfully removed");
        await dispatch(getAllProductsDashboard());
        setDeleteModal(null);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handleRestore = async () => {
    try {
      const response: any = await dispatch(restoreOneProduct(id));
      if (response.payload.success) {
        toast.success("Product successfully restored");
        await dispatch(getAllRemovedProductsDashboard());
        setDeleteModal(null);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
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
        {!deleted && (
          <button className="uppercase text-xs bg-green-500/60 dark:bg-green-500/75 hover:border-[1px] p-2 transition-all">
            edit
          </button>
        )}
        {!deleted && (
          <button
            className="uppercase text-xs bg-red-500/60 dark:bg-red-500/75 hover:border-[1px] p-2 transition-all"
            onClick={() =>
              setDeleteModal({
                id,
                image,
                name,
                description,
                price,
                rating,
                category,
                supply,
                ProductStat,
                deleted,
              })
            }
          >
            delete
          </button>
        )}
        {deleted && (
          <button
            className="uppercase text-xs bg-blue-500/60 dark:bg-blue-500/75 hover:border-[1px] p-2 transition-all"
            onClick={() =>
              setRestoreModal({
                id,
                image,
                name,
                description,
                price,
                rating,
                category,
                supply,
                ProductStat,
                deleted,
              })
            }
          >
            restore
          </button>
        )}
        {deleted && (
          <button
            className="uppercase text-xs bg-red-500/60 dark:bg-red-500/75 hover:border-[1px] p-2 transition-all"
            onClick={() =>
              setDeleteModalForEver({
                id,
                image,
                name,
                description,
                price,
                rating,
                category,
                supply,
                ProductStat,
                deleted,
              })
            }
          >
            delete
          </button>
        )}
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
      {deleteModal && (
        <DeleteConfirmation
          item={deleteModal}
          cancel={setDeleteModal}
          type="productDashbord"
          handleDelete={handleDelete}
        />
      )}
      {deleteModalForEver && (
        <DeleteConfirmation
          item={deleteModalForEver}
          cancel={setDeleteModalForEver}
          type="productDashbordDelete"
          handleDelete={handleDeleteForEver}
        />
      )}
      {restoreModal && (
        <DeleteConfirmation
          item={restoreModal}
          cancel={setRestoreModal}
          type="restoreProductDashbord"
          handleDelete={handleRestore}
        />
      )}
    </Card>
  );
};
export default Product;
