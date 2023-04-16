import {
  allBrands,
  allCategories,
  allFilters,
  getAllBrands,
  getAllCategories,
  orderAlphabetically,
  setFilters,
  filterByBrand,
  filterByCategory,
  sortPrices,
  orderByFilter,
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
  const filters = useSelector(allFilters);
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
  const handleFilterByBrands = (array: any, value: any) => {
    dispatch(orderByFilter({ array, value }));
    // dispatch(filterByBrand({ array, value }));
  };
  const handleFilterByCategory = (array: any, value: any) => {
    dispatch(orderByFilter({ array, value }));
    // dispatch(filterByCategory({ array, value }));
  };
  const handleFilters = (e: any) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    dispatch(setFilters(newFilters));
  };
  console.log(filters);
  console.log(categories);
  console.log(brands);
  return (
    <>
      {tittle === "Products" && (
        <div className="w-full min-h-[5vh] flex flex-wrap gap-y-2 justify-evenly items-center dark:bg-primary-600 bg-grey-10 dark:text-white text-black">
          <select
            className="p-2 dark:bg-primary-500 bg-grey-50 rounded-md"
            name="category"
            onChange={(e) => {
              handleFilters(e);
              handleFilterByCategory("Products".toLowerCase(), e.target.value);
            }}
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
            name="brand"
            onChange={(e) => {
              handleFilters(e);
              handleFilterByBrands("Products".toLowerCase(), e.target.value);
            }}
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
            name="price"
            onChange={(e) => {
              handleSortByPrice("Products".toLowerCase(), e.target.value);
              handleFilters(e);
            }}
          >
            <option>Price</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>

          <select
            className="p-2 dark:bg-primary-500 bg-grey-50 rounded-md"
            name="alphabetical"
            onChange={(e) => {
              handleSortByName("Products".toLowerCase(), e.target.value);
              handleFilters(e);
            }}
          >
            <option>Alphabetical</option>
            <option value="atoz">A - Z</option>
            <option value="ztoa">Z - A</option>
          </select>
        </div>
      )}
      {tittle === "Home" && (
        <div className="w-full min-h-[5vh] flex justify-evenly items-center">
          {/* {categories
            .slice(0, 10)
            .map((category: { id: number; name: string }) => (
              <Link
                key={category.id}
                className="p-2 font-semibold hover:scale-105 transition-all hover:text-secondary-400 rounded-md"
                href={`/products/${category.name}`}
              >
                {category.name}
              </Link>
            ))} */}
          <Link
            className="p-2 font-semibold hover:scale-105 transition-all text-secondary-400 hover:text-secondary-500 rounded-md underline"
            href={`/products`}
          >
            See Categories
          </Link>
        </div>
      )}
    </>
  );
};

export default Filters;
