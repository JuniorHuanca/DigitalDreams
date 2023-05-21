import { Box } from "@mui/material";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import { FiberNew, ShoppingCartOutlined, Delete } from "@mui/icons-material";
import { useState } from "react";
import NewProduct from "@/components/Dashboard/Products/NewProduct";
import RemovedProducts from "@/components/Dashboard/Products/RemovedProducts";
import Products from "@/components/Dashboard/Products/Products";
type Props = {};

const ProductsDashboard = (props: Props) => {
  const [component, setComponent] = useState({
    products: true,
    new: false,
    removed: false,
  });
  return (
    <LayoutDashboard title={"Dashboard - Products"}>
      <Box m="1.5rem 2.5rem">
        {/* <Header title="PRODUCTS" subtitle="See your list of products" /> */}
        <div className="flex flex-wrap gap-2 justify-evenly py-2">
          <button
            type="button"
            className="flex gap-2 items-center rounded-lg px-4 py-2 bg-white dark:bg-primary-500"
            onClick={() =>
              setComponent({
                products: true,
                new: false,
                removed: false,
              })
            }
          >
            <ShoppingCartOutlined />
            PRODUCTS
          </button>
          <button
            type="button"
            className="flex gap-2 items-center rounded-lg px-4 py-2 bg-white dark:bg-primary-500"
            onClick={() =>
              setComponent({
                products: false,
                new: true,
                removed: false,
              })
            }
          >
            <FiberNew />
            NEW PRODUCT
          </button>
          <button
            type="button"
            className="flex gap-2 items-center rounded-lg px-4 py-2 bg-white dark:bg-primary-500"
            onClick={() =>
              setComponent({
                products: false,
                new: false,
                removed: true,
              })
            }
          >
            <Delete />
            REMOVED PRODUCTS
          </button>
        </div>
        {component.products && <Products />}
        {component.new && <NewProduct />}
        {component.removed && <RemovedProducts />}
      </Box>
    </LayoutDashboard>
  );
};

export default ProductsDashboard;
