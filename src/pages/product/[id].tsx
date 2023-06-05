import {
  oneProduct,
  cleanUpProduct,
  selectOneProductStatus,
  getOneProduct,
  postOneReview,
  selectPostReviewStatus,
  selectAllReviewsStatus,
  allReviews,
  getAllReviewsProduct,
  selectPostReportReviewStatus,
  selectDeleteReviewStatus,
  selectPutReviewStatus,
} from "@/state/products/product/productSlice";
import { useAppDispatch } from "@/state/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useRouter } from "next/router";
import { EStateGeneric, IProduct, ITheme } from "@/shared/util/types";
import Loader from "../../components/Loaders/Loader";
import Layout from "@/components/Layouts/Layout";
import Link from "next/link";
import Image from "next/image";
import NotFound from "@/assets/404Product.gif";
import NotFoundMobile from "@/assets/404MobileProduct.gif";
import NotFoundDark from "@/assets/404ProductDark.gif";
import NotFoundDarkMobile from "@/assets/404MobileProductDark.gif";
import useMediaQuery from "@/shared/util/useMediaQuery";
import { Box, Rating, useTheme } from "@mui/material";
import Related from "@/components/Products/Related";
import CardReview from "@/components/Card/CardReview";
import { useSession } from "next-auth/react";
import Avatar from "react-avatar";
import { toast } from "react-hot-toast";
import Login from "@/components/Modals/Login";
import { BiArrowBack } from "react-icons/bi";
import Filters from "@/components/Navbar/Filters";
import {
  addNewProduct,
  allProductsCart,
  minusAllProducts,
  minusOneProduct,
  plusOneProduct,
} from "@/state/cart/cartSlice";
import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import LoaderModal from "@/components/Loaders/LoaderModal";
import { BsFillHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import {
  cleanUpProductFavorite,
  deleteOneFavorite,
  getOneFavorite,
  postOneFavorite,
  selectOneFavorite,
  selectPostFavoriteStatus,
} from "@/state/profile/profile/profileSlice";
type Props = {};
interface ISession {
  data: any;
  status: string;
}
const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Poor",
  1.5: "Below average",
  2: "Average",
  2.5: "Above average",
  3: "Good",
  3.5: "Very good",
  4: "Excellent",
  4.5: "Outstanding",
  5: "Exceptional",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
const Detail = (props: Props) => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 620px)");
  const [currentProductId, setCurrentProductId] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [hover, setHover] = useState(-1);
  const theme: ITheme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [errorImage, setErrorImage] = useState<boolean>(false);
  // const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const isFavorite = useSelector(selectOneFavorite);
  // const isFavorite = true;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmClear, setModalConfirmClear] = useState<IProduct>();
  const { mode } = theme.palette;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const reviewsStatus = useSelector(selectAllReviewsStatus);
  const statusDeleteReview = useSelector(selectDeleteReviewStatus);
  const statusPutReview = useSelector(selectPutReviewStatus);
  const productStatus = useSelector(selectOneProductStatus);
  const favoriteStatus = useSelector(selectPostFavoriteStatus);
  const reportStatus = useSelector(selectPostReportReviewStatus);
  const product = useSelector(oneProduct);
  const cart = useSelector(allProductsCart);
  const productFind = cart.find((item) => item.id === product.id);
  const reviews = useSelector(allReviews);
  const { data: session, status }: ISession = useSession();
  const [reviewFields, setReviewFields] = useState({
    productId: product.id,
    userId: session?.user?.id,
    description: "",
    rating: value,
  });
  const [reviewsPerProduct, setReviewsPerProduct] = useState<number>(3);
  const maxReviews = reviews?.length;
  const currentReviews = reviews?.slice(0, reviewsPerProduct);

  const counterPlus = () => {
    if (!productFind) {
      dispatch(addNewProduct(product));
      toast.success(
        `${product.name} has been successfully added to your cart.`
      );
    } else if (
      productFind &&
      productFind.quantity < productFind.product.stock
    ) {
      dispatch(plusOneProduct(product.id));
      // toast.success(
      //   `${product.name} is already in your cart. Quantity has been updated.`
      // );
    } else {
      toast.error(`There is not enough stock for "${product.name}"`);
    }
  };
  const counterLess = () => dispatch(minusOneProduct(product.id));
  const removeAllProducts = () => {
    dispatch(minusAllProducts(product.id));
    setModalConfirmClear(undefined);
    toast.success(`${product.name} removed successfully`);
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      const response = await dispatch(
        deleteOneFavorite({ userId: session?.user.id, productId: product.id })
      );
      if (response.payload.success) {
        toast.success("The product was removed from your favorites");
      }
    } else {
      const response = await dispatch(
        postOneFavorite({ userId: session?.user.id, productId: product.id })
      );
      if (response.payload.success) {
        toast.success("The product was added to your favorites");
      }
    }
    await dispatch(
      getOneFavorite({
        userId: session?.user.id,
        productId: product.id,
      })
    );
  };
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { id } = router.query;
        // if (productStatus === EStateGeneric.IDLE) {
        if (currentProductId !== id) {
          setCurrentProductId(id as string);
          await dispatch(getOneProduct(id as string));
        }
        if (reviewsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllReviewsProduct(id as string));
        }
      }
    })();
    if (session) {
      setReviewFields({
        ...reviewFields,
        userId: session.user.id,
        productId: product.id,
      });
      const { id } = router.query;
      dispatch(
        getOneFavorite({
          userId: session?.user.id,
          productId: parseInt(id as string),
        })
      );
    }
    return () => {
      if (currentProductId === router.query.id) {
        // dispatch(cleanUpProduct());
      }
      // dispatch(cleanUpProductFavorite());
    };
  }, [router.query.id, status]);
  const description = product?.description?.map((ele: Record<string, any>) => {
    const key = Object.keys(ele)[0];
    const value: any = Object.values(ele)[0];
    switch (key) {
      case "ul":
        if (Array.isArray(value)) {
          return (
            <ul>
              {value.map((data: string, index) => {
                return <li key={index}>{data}</li>;
              })}
            </ul>
          );
        } else {
          return null;
        }
      case "h2":
        if (value.startsWith("https://")) {
          return <Link href={value}>{value}</Link>;
        } else {
          return <p className="italic text-base">{value}</p>;
        }
      default:
        return <br />;
    }
  });
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!reviewFields.description || !reviewFields.rating) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(postOneReview(reviewFields));
    if (response.payload.success) {
      toast.success("Review created successfully");
      const { id } = router.query;
      setValue(0);
      setReviewFields({
        ...reviewFields,
        description: "",
        rating: 0,
      });
      await dispatch(getOneProduct(id as string));
      await dispatch(getAllReviewsProduct(id as string));
    } else {
      toast.error("Error creating review");
    }
  };
  return (
    <Layout
      title={`${product.name} - Digital Dreams` || "Error 404 Digital Dreams"}
    >
      <Filters title="Detail" />
      <div className="w-full min-h-[80vh] flex flex-col items-center">
        <button
          onClick={() => {
            router.back();
          }}
          className="self-start ml-6 px-2 pt-2 text-lg dark:border-white hover:animate-pulse border-black border-b-2 transition-all font-semibold flex items-center gap-1"
        >
          <BiArrowBack />
          Go back
        </button>
        {productStatus === EStateGeneric.PENDING && (
          <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
        {productStatus === EStateGeneric.FAILED && (
          <div className="relative w-full h-[80vh] flex justify-center items-center">
            {mode === "dark" && (
              <Image
                src={isAboveSmallScreens ? NotFoundDark : NotFoundDarkMobile}
                alt="Error"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 700px"
              />
            )}
            {mode !== "dark" && (
              <Image
                src={isAboveSmallScreens ? NotFound : NotFoundMobile}
                alt="Error"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 700px"
              />
            )}
          </div>
        )}
        {productStatus === EStateGeneric.SUCCEEDED && product.name && (
          <div className="w-full sm:min-h-[80vh] flex flex-col sm:flex-row sm:items-start gap-4 sm:py-4 flex-wrap">
            <div className="flex flex-col w-full sm:w-auto px-2 sm:px-8">
              <Link
                href={`/products/brand?name=${product.brand.name}`}
                className="text-3xl text-center sm:text-left font-semibold my-2 md:m-4 uppercase underline underline-offset-8"
              >
                {product.brand.name}
              </Link>
              <div className="relative w-full sm:w-[500px] h-[250px] xs:h-[350px] md:h-[450px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col py-6 gap-2 h-auto px-4 sm:px-8">
              <h2 className="text-lg md:text-xl font-semibold capitalize ">
                {product.name}
              </h2>
              <p className="flex font-semibold gap-2 items-center">
                <Rating
                  value={product.rating}
                  precision={0.1}
                  size="large"
                  readOnly
                />
                {product.rating ? product.rating : "no reviews"}
              </p>
              <details className="w-full overflow-hidden" open>
                <summary
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-base"
                >
                  {isOpen ? "Hide description" : "Show description"}
                </summary>
                {isOpen && (
                  <div className="h-[210px] overflow-auto scroll-white">
                    {description}
                  </div>
                )}
              </details>
              <div className="flex flex-col">
                <p className="font-semibold text-2xl">US $ {product.price}</p>
                <div>
                  <button
                    className="mr-4 py-4 px-3 dark:bg-primary-700 hover:dark:bg-primary-800 bg-white hover:bg-slate-300 rounded-sm"
                    type="button"
                    onClick={() =>
                      productFind?.quantity > 1
                        ? counterLess()
                        : productFind && setModalConfirmClear(product)
                    }
                  >
                    -
                  </button>
                  {productFind?.quantity | 0}
                  <button
                    className="ml-4 py-4 px-3 dark:bg-primary-700 hover:dark:bg-primary-800 bg-white hover:bg-slate-300 rounded-sm"
                    disabled={product.stock ? false : true}
                    type="button"
                    onClick={() => counterPlus()}
                  >
                    +
                  </button>
                </div>
                <span className={`my-2 ${product.stock ? "" : "line-through"}`}>
                  {product.stock
                    ? `Stock available: ${product.stock}`
                    : "Product sold out"}
                </span>
                <div className="flex gap-4">
                  {/* <button
                    type="button"
                    className="w-40 p-4 border-2 dark:border-white border-black hover:dark:bg-primary-800 hover:bg-slate-300"
                    disabled={product.stock ? false : true}
                    onClick={() => {
                      counterPlus();
                    }}
                  >
                    {product.stock ? `ADD TO CART` : `NO STOCK`}
                  </button> */}
                  <button
                    type="button"
                    className="bg-indigo-700 hover:bg-indigo-800 p-4 font-bold rounded text-white flex justify-center items-center gap-2"
                    disabled={product.stock ? false : true}
                    onClick={() => {
                      counterPlus();
                    }}
                  >
                    <FaShoppingCart className="w-8 h-8 cursor-pointer" />
                    {product.stock ? `ADD TO CART` : `NO STOCK`}
                  </button>
                  {session && (
                    <button
                      type="button"
                      className={`hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 border-none favorite ${
                        isFavorite ? "bg-pink-600" : "bg-pink-500"
                      }`}
                      // onClick={() => setIsFavorite(!isFavorite)}
                      onClick={handleFavorite}
                    >
                      <BsFillHeartFill
                        className={`w-8 h-8 fill-white icon ${
                          isFavorite ? "fill-[#ec4899] scale-125" : "fill-white"
                        }`}
                      />
                      FAVORITE
                    </button>
                  )}
                  {!session && (
                    <button
                      type="button"
                      onClick={handleClick}
                      className={`hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 border-none favorite ${
                        isFavorite ? "bg-pink-600" : "bg-pink-500"
                      }`}
                    >
                      <BsFillHeartFill
                        className={`w-8 h-8 fill-white icon ${
                          isFavorite ? "fill-[#ec4899]  scale-125" : "fill-white"
                        }`}
                      />
                      FAVORITE
                    </button>
                  )}
                </div>
              </div>
            </div>
            <Related name={product.subcategory.name} id={product.id} />
            <div className="px-4 sm:px-8 w-full">
              <div className="w-full border-2 dark:border-white border-black">
                <div className="w-full border-b-2 dark:border-white border-black py-2">
                  <p className="text-center text-xl">User Reviews</p>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full flex flex-col sm:w-[50%] gap-2 p-2">
                    {/* <div className='w-full'>
                                            <select onChange={(e) => filterByDate(e.target.value)}>
                                                <option value="all">Seleccione una fecha</option>
                                                <option value="MostRecent">Most recent</option>
                                                <option value="Oldest">Oldest</option>
                                            </select>
                                            <select onChange={(e) => filterByRating(parseInt(e.target.value))}>
                                                <option value=''>Seleccione las estrellas</option>
                                                <option value={6}>Ver todos</option>
                                                <option value={5}>⭐⭐⭐⭐⭐</option>
                                                <option value={4}>⭐⭐⭐⭐</option>
                                                <option value={3}>⭐⭐⭐</option>
                                                <option value={2}>⭐⭐</option>
                                                <option value={1}>⭐</option>
                                                <option value={0}>0</option>

                                            </select>
                                        </div> */}

                    {currentReviews.length ? (
                      currentReviews.map((e: any, index: any) => (
                        <CardReview
                          review={e}
                          user={session ? session.user : {}}
                          key={index}
                        />
                      ))
                    ) : (
                      <div className="w-full sm:w-[50%] mt-12 gap-2">
                        <p className="my-auto text-center text-lg font-semibold animate-bounce">
                          Hi there! Be the first to leave a review about our
                          product! Your opinion is very valuable to us.
                          Don&apos;t hesitate to share your experience and
                          thoughts. Thank you!
                        </p>
                      </div>
                    )}
                    <div className="flex p-2 justify-evenly">
                      {reviewsPerProduct < maxReviews && (
                        <button
                          className="p-2 border-2 border-black dark:border-white hover:scale-105 transition-all"
                          onClick={() =>
                            setReviewsPerProduct(reviewsPerProduct + 3)
                          }
                        >
                          See more
                        </button>
                      )}
                      {reviewsPerProduct > 3 && (
                        <button
                          className="p-2 border-2 border-black dark:border-white hover:scale-105 transition-all"
                          onClick={() =>
                            setReviewsPerProduct(reviewsPerProduct - 3)
                          }
                        >
                          See less
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col sm:w-[50%] gap-2 border-t-2 sm:border-0 border-black dark:border-white p-2">
                    <div className="flex items-center gap-2 py-3">
                      <div className="relative h-12 w-12  overflow-hidden">
                        {session &&
                          (session.user.image && !errorImage ? (
                            <Image
                              className="rounded-full"
                              src={session.user.image}
                              alt={session.user.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 700px"
                              priority
                              onError={() => setErrorImage(true)}
                            />
                          ) : (
                            <Avatar
                              name={session.user.name}
                              size="100%"
                              round={true}
                            />
                          ))}
                        {!session && (
                          <div className="rounded-full w-12 h-12 bg-slate-400"></div>
                        )}
                      </div>
                      {session ? session.user.name : "DigitalDreams"}
                    </div>
                    <form
                      className=" flex flex-col gap-2"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <label htmlFor="">Rating </label>
                      <div className="flex gap-2 font-semibold items-center">
                        <Rating
                          value={value}
                          precision={0.5}
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setValue(newValue as number);
                            setReviewFields({
                              ...reviewFields,
                              rating: newValue as number,
                              productId: product.id,
                            });
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          size="large"
                        />
                        {value !== null && (
                          <div>{labels[hover !== -1 ? hover : value]}</div>
                        )}
                      </div>
                      <textarea
                        className="min-h-[125px] h-[125px] bg-white dark:bg-primary-500 rounded-lg focus:outline-none p-4"
                        placeholder="Write your opinion about the product here. Include your comments on its quality, functionality, ease of use, value, and anything else you think is important. Your feedback is valuable to us and to other users, so don't hold back!"
                        onBlur={(e) =>
                          setReviewFields({
                            ...reviewFields,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                      {session && (
                        <button
                          type="submit"
                          className="w-40 p-4 border-2 dark:border-white border-black hover:dark:bg-primary-800 hover:bg-slate-300"
                        >
                          SUBMIT
                        </button>
                      )}
                      {!session && (
                        <button
                          type="button"
                          onClick={handleClick}
                          className="w-40 p-4 border-2 dark:border-white border-black hover:dark:bg-primary-800 hover:bg-slate-300"
                        >
                          SUBMIT
                        </button>
                      )}
                      {showModal && <Login setShowModal={setShowModal} />}
                      {modalConfirmClear && (
                        <DeleteConfirmation
                          item={modalConfirmClear}
                          cancel={setModalConfirmClear}
                          handleDelete={removeAllProducts}
                          type={"product"}
                        />
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {statusPutReview === EStateGeneric.PENDING && <LoaderModal />}
        {statusDeleteReview === EStateGeneric.PENDING && <LoaderModal />}
        {reportStatus === EStateGeneric.PENDING && <LoaderModal />}
        {favoriteStatus === EStateGeneric.PENDING && <LoaderModal />}
      </div>
    </Layout>
  );
};

export default Detail;
