import CardReviewProfile from "@/components/Card/CardReviewProfile";
import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Loader from "@/components/Loaders/Loader";
import LoaderModal from "@/components/Loaders/LoaderModal";
import { EStateGeneric } from "@/shared/util/types";
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
  useEffect(() => {
    setMounted(true);
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
              <div className="flex flex-col w-full h-full bg-slate-100 dark:bg-primary-500 rounded-lg">
                <h1 className="p-4 text-xl sm:text-4xl font-bold mb-4">
                  My Reviews
                </h1>
                {reviewsStatus === EStateGeneric.SUCCEEDED && !isEmpty && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  overflow-y-auto scroll-white">
                    {reviews.map((review) => (
                      <CardReviewProfile
                        key={review.id}
                        review={review}
                        userId={session?.user.id}
                      />
                    ))}
                  </div>
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
