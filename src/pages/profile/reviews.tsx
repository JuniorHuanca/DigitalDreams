import CardReviewProfile from "@/components/Card/CardReviewProfile";
import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Loader from "@/components/Loaders/Loader";
import LoaderModal from "@/components/Loaders/LoaderModal";
import Pagination from "@/components/Pagination";
import { EStateGeneric } from "@/shared/util/types";
import { selectCurrentPage, setCurrentPage } from "@/state/globalSlice";
import {
  selectDeleteReviewStatus,
  selectPutReviewStatus,
} from "@/state/products/product/productSlice";
import {
  cleanUpReviews,
  getAllReviews,
  selectAllReviews,
  selectAllReviewsStatus,
} from "@/state/profile/profile/profileSlice";
import { useAppDispatch } from "@/state/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdCommentsDisabled } from "react-icons/md";
import { useSelector } from "react-redux";
type Props = {};
interface ISession {
  data: any;
  status: string;
}
const Reviews = (props: Props) => {
  const { data: session, status }: ISession = useSession();
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const reviewsStatus = useSelector(selectAllReviewsStatus);
  const statusDeleteReview = useSelector(selectDeleteReviewStatus);
  const statusPutReview = useSelector(selectPutReviewStatus);
  const reviews = useSelector(selectAllReviews);
  const isEmpty = reviews.length === 0;

  const itemsPerPage = 9;
  const currentPage = useSelector(selectCurrentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setMounted(true);
    dispatch(setCurrentPage(1));
    (async () => {
      if (reviewsStatus === EStateGeneric.IDLE) {
        await dispatch(getAllReviews(session?.user.id));
      }
    })();
    return () => {
      setMounted(false);
      if (reviewsStatus === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpReviews());
      }
    };
  }, [status, session, reviewsStatus]);
  if (status === "loading" || !mounted) {
    return (
      <div className="w-screen h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <Layout title={"Reviews"}>
      <div>
        <LayoutProfile>
          <div className="w-full h-full">
            <div className="flex flex-col items-center h-full">
              <div className="flex flex-col w-full h-full bg-slate-200 dark:bg-primary-500 rounded-lg">
                <h1 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                  My Reviews
                </h1>
                {reviewsStatus === EStateGeneric.SUCCEEDED && !isEmpty && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 overflow-y-auto scroll-white">
                    {currentItems.map((review, index) => (
                      <CardReviewProfile
                        key={index}
                        review={review}
                        userId={session?.user.id}
                      />
                    ))}
                  </div>
                )}
                {reviews.length > itemsPerPage && (
                  <Pagination
                    items={reviews}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                  />
                )}
                {reviewsStatus === EStateGeneric.SUCCEEDED && isEmpty && (
                  <div className="flex flex-col justify-center items-center p-4 gap-4 sm:gap-2">
                    <p className="text-5xl sm:text-8xl">
                      <MdCommentsDisabled />
                    </p>
                    <h2 className="text-center text-4xl sm:text-5xl sm:text-start font-semibold">
                      You don&apos;t have product reviews yet
                    </h2>
                  </div>
                )}
                {reviewsStatus === EStateGeneric.PENDING && (
                  <div className="w-full h-[70vh] flex justify-center items-center">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </LayoutProfile>
        {statusDeleteReview === EStateGeneric.PENDING && <LoaderModal />}
        {statusPutReview === EStateGeneric.PENDING && <LoaderModal />}
      </div>
    </Layout>
  );
};

export default Reviews;
