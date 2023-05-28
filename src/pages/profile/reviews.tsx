import CardReviewProfile from "@/components/Card/CardReviewProfile";
import Layout from "@/components/Layouts/Layout";
import LayoutProfile from "@/components/Layouts/LayoutProfile";
import Loader from "@/components/Loaders/Loader";
import { EStateGeneric } from "@/shared/util/types";
import { selectAllReviewsStatus } from "@/state/products/product/productSlice";
import {
  cleanUpReviews,
  getAllReviews,
  selectAllReviews,
} from "@/state/profile/profile/profileSlice";
import { useAppDispatch } from "@/state/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
  // const deleteFavoriteStatus = useSelector(selectDeleteFavoriteStatus);
  const reviews = useSelector(selectAllReviews);

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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  overflow-y-auto scroll-white">
                  {reviews.map((review) => (
                    <CardReviewProfile
                      key={review.id}
                      review={review}
                      userId={session?.user.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LayoutProfile>
      </div>
    </Layout>
  );
};

export default Reviews;
