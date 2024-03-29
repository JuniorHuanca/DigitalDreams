import { Rating } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Avatar from "react-avatar";
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import Login from "../Modals/Login";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { toast } from "react-hot-toast";
import {
  deleteOneReview,
  getAllReviewsProduct,
  getOneProduct,
  putOneReview,
  selectPostReportReviewStatus,
} from "@/state/products/product/productSlice";
import { useAppDispatch } from "@/state/store";
import EditReview from "./EditReview";
import { useSelector } from "react-redux";
import Reports from "../Modals/Reports";
import { EStateGeneric, IReview, IUser } from "@/shared/util/types";
import LoaderModal from "../Loaders/LoaderModal";

type Props = {
  review: IReview;
  user: IUser;
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
const CardReview = ({ review, user }: Props) => {
  const dispatch = useAppDispatch();
  const createdAt = new Date(review.createdAt);
  const updatedAt = new Date(review.updatedAt);
  const status = useSelector(selectPostReportReviewStatus);
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalReport, setShowModalReport] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<null | IReview>(null);
  const [editReview, setEditReview] = useState<null | IReview>(null);
  const [reviewFields, setReviewFields] = useState({
    reviewId: review.id,
    description: review.description,
    rating: review.rating,
  });
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const formattedCreatedAt = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
  const formattedUpdatedAt = `${updatedAt.getDate()}/${
    updatedAt.getMonth() + 1
  }/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}`;

  const handleDelete = async () => {
    try {
      const response: any = await dispatch(deleteOneReview(review.id));
      if (response.payload.success) {
        toast.success("Review successfully removed", { duration: 3000 });
        await dispatch(getOneProduct(review.productId.toString()));
        await dispatch(getAllReviewsProduct(review.productId.toString()));
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
        await dispatch(getOneProduct(review.productId.toString()));
        await dispatch(getAllReviewsProduct(review.productId.toString()));
        setEditReview(null);
      }
    } catch (error) {
      toast.error("something went wrong", { duration: 3000 });
    }
  };
  return (
    <div className="w-full border-[1px] border-black dark:border-white p-2 overflow-hidden relative">
      <div className="flex items-center gap-2 py-3">
        <div className="relative h-12 w-12 overflow-hidden">
          {review.user.image && !errorImage ? (
            <Image
              className="rounded-full"
              src={review.user.image}
              alt={review.user.name}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              onError={() => setErrorImage(true)}
            />
          ) : (
            <Avatar name={review.user.name} size="100%" round={true} />
          )}
        </div>
        {review.user.name}
      </div>
      {editReview ? (
        <EditReview
          editReview={editReview}
          labels={labels}
          formattedCreatedAt={formattedCreatedAt}
          formattedUpdatedAt={formattedUpdatedAt}
          handleEdit={handleEdit}
          setEditReview={setEditReview}
          setReviewFields={setReviewFields}
          reviewFields={reviewFields}
        />
      ) : (
        <div className="flex flex-col overflow-y-auto max-h-[250px]">
          <p className="flex gap-2 items-center">
            <Rating
              value={review.rating}
              precision={0.1}
              size="large"
              readOnly
            />
            <span className="flex font-semibold">{labels[review.rating]}</span>
          </p>
          <p className="text-gray-500">Created: {formattedCreatedAt} UTC</p>
          {formattedCreatedAt !== formattedUpdatedAt && (
            <p className="text-gray-400">Modified: {formattedUpdatedAt} UTC</p>
          )}
          <p>{review.description}</p>
        </div>
      )}
      <div className="absolute top-0 right-0 text-2xl p-2">
        {review.userId === user?.id && (
          <button
            className="text-green-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl p-1"
            type="button"
            onClick={() => setEditReview(review)}
          >
            <BiEdit />
          </button>
        )}
        {user &&
          (review.userId === user.id ||
            user.role === "Admin" ||
            user.role === "Manager") && (
            <button
              className="text-red-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl p-1"
              type="button"
              onClick={() => setDeleteModal(review)}
            >
              <BsFillTrashFill />
            </button>
          )}

        {user?.name && review.userId !== user?.id && (
          <button
            className="text-yellow-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl p-1"
            type="button"
            onClick={() => setShowModalReport(true)}
          >
            <MdReportProblem />
          </button>
        )}
        {!user?.name && (
          <button
            className="text-yellow-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl p-1"
            type="button"
            onClick={handleClick}
          >
            <MdReportProblem />
          </button>
        )}
      </div>
      {showModal && <Login setShowModal={setShowModal} />}
      {showModalReport && (
        <Reports
          setShowModal={setShowModalReport}
          review={review}
          user={user}
        />
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
export default CardReview;
