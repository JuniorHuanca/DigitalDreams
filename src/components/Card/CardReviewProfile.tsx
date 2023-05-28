import { IReview } from "@/shared/util/types";
import { Rating } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/state/store";
import {
  deleteOneReview,
  putOneReview,
} from "@/state/products/product/productSlice";
import EditReview from "./EditReview";
import { getAllReviews } from "@/state/profile/profile/profileSlice";
type Props = {
  review: IReview;
  userId: string;
};
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
const CardReviewProfile = ({ review, userId }: Props) => {
  const dispatch = useAppDispatch();
  const [deleteModal, setDeleteModal] = useState<IReview | null>(null);
  const [editReview, setEditReview] = useState<IReview | null>(null);
  const [reviewFields, setReviewFields] = useState({
    reviewId: review.id,
    description: review.description,
    rating: review.rating,
  });
  const formatDate = (value: string | Date) => {
    const date = new Date(value);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const handleDelete = async () => {
    try {
      const response: any = await dispatch(deleteOneReview(review.id));
      if (response.payload.success) {
        toast.success("Review successfully removed", { duration: 3000 });
        await dispatch(getAllReviews(userId));
        setDeleteModal(null);
      }
    } catch (error) {
      toast.error("something went wrong", { duration: 3000 });
    }
  };
  const handleEdit = async () => {
    try {
      const response: any = await dispatch(putOneReview(reviewFields));
      if (response.payload.success) {
        toast.success("Review successfully updated", { duration: 3000 });
        await dispatch(getAllReviews(userId));
        setEditReview(null);
      }
    } catch (error) {
      toast.error("something went wrong", { duration: 3000 });
    }
  };

  return (
    <div className="bg-white dark:bg-indigo-900 dark:text-white space-y-3 p-4 rounded-lg shadow">
      {editReview ? (
        <EditReview
          editReview={editReview}
          labels={labels}
          formattedCreatedAt={formatDate(review.createdAt)}
          formattedUpdatedAt={formatDate(review.updatedAt)}
          handleEdit={handleEdit}
          setEditReview={setEditReview}
          setReviewFields={setReviewFields}
          reviewFields={reviewFields}
        />
      ) : (
        <>
          <div className="flex flex-wrap items-center space-x-2 text-sm">
            <div>
              <p className="text-blue-500 font-bold hover:underline">
                #{review.id}
              </p>
            </div>
            <div className="dark:text-white text-gray-500">
              {formatDate(review.createdAt)}
            </div>
            <div>
              <span className="p-1.5 text-xs font-semibold uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                Review
              </span>
            </div>
          </div>
          <a
            href={`/product/${review.productId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center dark:text-white gap-2 text-gray-700"
          >
            <img
              src={review.product?.image}
              alt={review.product?.name}
              width="100"
            />
            <p>{review.product?.name}</p>
          </a>
          <div className="text-sm dark:text-white text-gray-700">
            {review.description}
          </div>
          <div className="flex flex-wrap items-center">
            <Rating
              value={review.rating}
              precision={0.1}
              size="medium"
              readOnly
            />
            <button
              className="text-green-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl flex items-center p-1"
              type="button"
              onClick={() => setEditReview(review)}
            >
              <BiEdit className="text-2xl" /> Edit
            </button>
            <button
              className="text-red-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl flex items-center p-1"
              type="button"
              onClick={() => setDeleteModal(review)}
            >
              <BsFillTrashFill className="text-2xl" /> Delete
            </button>
          </div>
        </>
      )}
      {deleteModal && (
        <DeleteConfirmation
          item={deleteModal}
          cancel={setDeleteModal}
          type="review"
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CardReviewProfile;
