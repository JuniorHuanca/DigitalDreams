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
import styles from "./Filters.module.css";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { setCurrentPage } from "@/state/globalSlice";
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
        await dispatch(getAllCategories());
        await dispatch(getAllBrands());
      }
    })();
  }, []);
  const handleSortByName = (array: any, value: any) => {
    dispatch(orderAlphabetically({ array, value }));
    dispatch(setCurrentPage(1));
  };
  const handleSortByPrice = (array: any, value: any) => {
    dispatch(sortPrices({ array, value }));
    dispatch(setCurrentPage(1));
  };
  const handleFilterByBrands = (array: any, value: any) => {
    dispatch(orderByFilter({ array, value }));
    dispatch(setCurrentPage(1));
  };
  const handleFilterByCategory = (array: any, value: any) => {
    dispatch(orderByFilter({ array, value }));
    dispatch(setCurrentPage(1));
  };
  const handleFilters = (e: any) => {
    const { name, value } = e.target;
    if (value === "all") {
      const { [name]: removedFilter, ...restFilters } = filters;
      dispatch(setFilters(restFilters));
    } else {
      const newFilters = {
        ...filters,
        [name]: value,
      };
      dispatch(setFilters(newFilters));
    }
  };
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
            <option value="allBrand">All Brands</option>
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
          <div className="text-black dark:text-white uppercase underline underline-offset-4">
            <span className={` font-semibold text-lg ${styles.span}`}>
              See Categories
              <ul
                className={`hidden ${styles.ul} text-sm dark:bg-primary-500 bg-white rounded-xl overflow-hidden`}
              >
                {categories.map((category: { id: number; name: string }) => (
                  <Link
                    key={category.id}
                    className="px-4 py-2 font-semibold hover:scale-105 transition-all hover:dark:text-secondary-500 hover:text-primary-500 rounded-md w-[50%]"
                    href={`/products/${category.name}`}
                  >
                    <li className="flex gap-1 items-center border-b-2 border-black dark:border-white">
                      <AiOutlineDoubleRight />
                      {category.name}
                    </li>
                  </Link>
                ))}
                <Link
                  href={`/products`}
                  className="text-center w-full dark:bg-primary-400 bg-slate-300 py-2"
                >
                  See all Products
                </Link>
              </ul>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
