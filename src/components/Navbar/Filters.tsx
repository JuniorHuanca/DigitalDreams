import {
  allBrands,
  allCategories,
  getAllBrands,
  getAllCategories,
  orderAlphabetically,
  sortByBrand,
  sortByCategory,
  sortPrices,
} from "@/state/products/products/productsSlice";
import { useAppDispatch } from "@/state/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  tittle: string;
};

const Filters = ({ tittle }: Props) => {
  const categories = useSelector(allCategories);
  const brands = useSelector(allBrands);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        // if (productsStatus === EStateGeneric.IDLE) {
        await dispatch(getAllCategories());
        await dispatch(getAllBrands());
        // }
      }
    })();
  }, []);
  const handleSortByName = (array: any, value: any) => {
    dispatch(orderAlphabetically({ array, value }));
  };
  const handleSortByPrice = (array: any, value: any) => {
    dispatch(sortPrices({ array, value }));
  };
  const handleSortByBrands = (array: any, value: any) => {
    dispatch(sortByBrand({ array, value }));
  };
  const handleSortByCategory = (array: any, value: any) => {
    dispatch(sortByCategory({ array, value }));
  };
  return (
    <>
      {tittle === "Products" && (
        <div className="w-full min-h-[5vh] flex flex-wrap gap-y-2 justify-evenly items-center dark:bg-primary-600 bg-grey-10 dark:text-white text-black">
          <select
            className="p-2 dark:bg-primary-500 bg-grey-50 rounded-md"
            onChange={(e) =>
              handleSortByCategory("Products".toLowerCase(), e.target.value)
            }
          >
            <option value="all">All Categories</option>
            {categories.map((category: { id: number; name: string }) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 dark:bg-primary-500 bg-grey-50 rounded-md"
            onChange={(e) =>
              handleSortByBrands("Products".toLowerCase(), e.target.value)
            }
          >
            <option value="all">All Brands</option>
            {brands.map((brand: { id: number; name: string }) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 dark:bg-primary-500 bg-grey-50 rounded-md"
            onChange={(e) =>
              handleSortByPrice("Products".toLowerCase(), e.target.value)
            }
          >
            <option>Price</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>

          <select
            className="p-2 dark:bg-primary-500 bg-grey-50 rounded-md"
            onChange={(e) =>
              handleSortByName("Products".toLowerCase(), e.target.value)
            }
          >
            <option>Alphabetical</option>
            <option value="atoz">A - Z</option>
            <option value="ztoa">Z - A</option>
          </select>
        </div>
      )}
      {tittle === "Home" && (
        <div className="w-full min-h-[5vh] flex justify-evenly items-center bg-primary-500">
          {categories
            .slice(0, 10)
            .map((category: { id: number; name: string }) => (
              <Link
                key={category.id}
                className="p-2 font-semibold hover:scale-105 transition-all hover:text-secondary-400 rounded-md"
                href={`/products/${category.name}`}
              >
                {category.name}
              </Link>
            ))}
          <Link
            className="p-2 font-semibold hover:scale-105 transition-all text-secondary-400 hover:text-secondary-500 rounded-md"
            href={`/products`}
          >
            See All Products
          </Link>
        </div>
      )}
    </>
  );
};

export default Filters;
