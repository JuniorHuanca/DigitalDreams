import {
  allBrands,
  allCategories,
  allFilters,
  getAllBrands,
  getAllCategories,
  orderAlphabetically,
  setFilters,
  sortPrices,
  orderByFilter,
  allProductsBrand,
  allProductsCategory,
} from "@/state/products/products/productsSlice";
import { useAppDispatch } from "@/state/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Filters.module.css";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { setCurrentPage } from "@/state/globalSlice";
import {
  FaLastfmSquare,
  FaSortAlphaDownAlt,
  FaSortAlphaUpAlt,
  FaSortNumericUpAlt,
  FaSortNumericDownAlt,
} from "react-icons/fa";
type Props = {
  title: string;
};

const Filters = ({ title }: Props) => {
  const [price, setPrice] = useState<boolean>();
  const [alphabetical, setAlphabetical] = useState<boolean>();
  const categories = useSelector(allCategories);
  const brands = useSelector(allBrands);
  const filters = useSelector(allFilters);
  const dispatch = useAppDispatch();
  const productsCateogry = useSelector(allProductsCategory);
  const products = useSelector(allProductsBrand);
  useEffect(() => {
    (async () => {
      await dispatch(getAllCategories());
      await dispatch(getAllBrands());
    })();
  }, []);
  const handleSortByName = (array: any, value: any) => {
    dispatch(orderAlphabetically({ array, value }));
    dispatch(setCurrentPage(1));
    setPrice(undefined);
    setAlphabetical(!alphabetical);
  };
  const handleSortByPrice = (array: any, value: any) => {
    dispatch(sortPrices({ array, value }));
    dispatch(setCurrentPage(1));
    setAlphabetical(undefined);
    setPrice(!price);
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
      {title === "Products" && (
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

          {filters.category && (
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
          )}

          {!price && (
            <button
              type="button"
              name="lowest"
              className={`${
                price === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByPrice(
                  "Products".toLowerCase(),
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortNumericDownAlt />
              <span className="text-sm">Price</span>
            </button>
          )}
          {price && (
            <button
              type="button"
              name="highest"
              className={`${
                price === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByPrice(
                  "Products".toLowerCase(),
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortNumericUpAlt />
              <span className="text-sm">Price</span>
            </button>
          )}

          {!alphabetical && (
            <button
              type="button"
              name="atoz"
              className={`${
                alphabetical === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByName(
                  "Products".toLowerCase(),
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortAlphaDownAlt />
              <span className="text-sm">Alphabetical</span>
            </button>
          )}
          {alphabetical && (
            <button
              type="button"
              name="ztoa"
              className={`${
                alphabetical === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByName(
                  "Products".toLowerCase(),
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortAlphaUpAlt />
              <span className="text-sm">Alphabetical</span>
            </button>
          )}
        </div>
      )}
      {title === "Home" && (
        <div className="w-full min-h-[5vh] flex justify-evenly items-center">
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
                  className="text-center w-full dark:bg-indigo-500/40 bg-slate-300 py-2"
                >
                  See all Products
                </Link>
              </ul>
            </span>
          </div>
        </div>
      )}
      {title === "Detail" && (
        <div className="w-full min-h-[5vh] flex justify-evenly items-center">
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
                  className="text-center w-full dark:bg-indigo-500/40 bg-slate-300 py-2"
                >
                  See all Products
                </Link>
              </ul>
            </span>
          </div>
        </div>
      )}
      {title === "Brand" && (
        <div className="w-full min-h-[5vh] flex flex-wrap gap-y-2 justify-evenly items-center dark:bg-primary-600 bg-grey-10 dark:text-white text-black">
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
                  className="text-center w-full dark:bg-indigo-500/40 bg-slate-300 py-2"
                >
                  See all Products
                </Link>
              </ul>
            </span>
          </div>
          {!price && (
            <button
              type="button"
              name="lowest"
              className={`${
                price === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByPrice(
                  products.length
                    ? "productsBrand"
                    : productsCateogry.length
                    ? "productsCategory"
                    : "productsBySearch",
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortNumericDownAlt />
              <span className="text-sm">Price</span>
            </button>
          )}
          {price && (
            <button
              type="button"
              name="highest"
              className={`${
                price === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByPrice(
                  products.length
                    ? "productsBrand"
                    : productsCateogry.length
                    ? "productsCategory"
                    : "productsBySearch",
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortNumericUpAlt />
              <span className="text-sm">Price</span>
            </button>
          )}

          {!alphabetical && (
            <button
              type="button"
              name="atoz"
              className={`${
                alphabetical === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByName(
                  products.length
                    ? "productsBrand"
                    : productsCateogry.length
                    ? "productsCategory"
                    : "productsBySearch",
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortAlphaDownAlt />
              <span className="text-sm">Alphabetical</span>
            </button>
          )}
          {alphabetical && (
            <button
              type="button"
              name="ztoa"
              className={`${
                alphabetical === undefined
                  ? "dark:bg-primary-500 bg-grey-50"
                  : "dark:bg-primary-700 bg-grey-100"
              } text-2xl p-2 rounded-md flex items-center gap-2`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSortByName(
                  products.length
                    ? "productsBrand"
                    : productsCateogry.length
                    ? "productsCategory"
                    : "productsBySearch",
                  e.currentTarget.name
                );
                handleFilters(e);
              }}
            >
              <FaSortAlphaUpAlt />
              <span className="text-sm">Alphabetical</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Filters;
