import { IReport } from "@/shared/util/types";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Avatar from "react-avatar";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { useAppDispatch } from "@/state/store";
import { toast } from "react-hot-toast";
import {
  deleteOneReview,
  restoreOneReview,
} from "@/state/products/product/productSlice";
import { getAllReports } from "@/state/reviews/reviews/reviewsSlice";

type Props = {
  review: any;
  // user: any;
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
const ReportReview = ({ review }: Props) => {
  const dispatch = useAppDispatch();
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editReview, setEditReview] = useState<any>(null);
  const createdAt = new Date(review.createdAt);
  const updatedAt = new Date(review.updatedAt);
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
        toast.success("Review successfully removed");
        setDeleteModal(null);
        await dispatch(getAllReports());
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handleRestore = async () => {
    try {
      const response: any = await dispatch(restoreOneReview(review.id));
      if (response.payload.success) {
        toast.success("Review successfully restored");
        setEditReview(null);
        await dispatch(getAllReports());
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="flex flex-wrap gap-2 border-[1px] border-black dark:border-white sm:border-none">
      <div className="w-full sm:w-[49%] border-[1px] border-black dark:border-white p-2 overflow-hidden relative">
        <div className="flex items-center gap-2 py-3">
          <div className="relative h-12 w-12 overflow-hidden">
            {review.user.image && !errorImage ? (
              <Image
                className="rounded-full"
                src={review.user.image}
                alt={review.user.name}
                fill
                onError={() => setErrorImage(true)}
              />
            ) : (
              <Avatar name={review.user.name} size="100%" round={true} />
            )}
          </div>
          {review.user.name}
        </div>
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
        <div className="absolute top-0 right-0 text-2xl p-2">
          <button
            className="text-green-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl p-1"
            type="button"
            onClick={() => setEditReview(review)}
          >
            <FaTrashRestoreAlt />
          </button>
          <button
            className="text-red-500 hover:animate-bell-swing-scale hover:dark:bg-primary-500 hover:bg-white rounded-xl p-1"
            type="button"
            onClick={() => setDeleteModal(review)}
          >
            <BsFillTrashFill />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full sm:w-[49%] p-2 overflow-y-auto max-h-[250px] border-[1px] border-black dark:border-white">
        <h2 className="text-xl font-semibold">Reports</h2>
        {review.reports.map((report: IReport, index: number) => (
          <div
            key={index}
            className="p-2 rounded-lg dark:bg-primary-500 bg-slate-300"
          >
            <div className="flex items-center gap-2 py-1">
              <div className="relative h-12 w-12 overflow-hidden">
                {report.user.image && !errorImage ? (
                  <Image
                    className="rounded-full"
                    src={report.user.image}
                    alt={report.user.name}
                    fill
                    onError={() => setErrorImage(true)}
                  />
                ) : (
                  <Avatar name={report.user.name} size="100%" round={true} />
                )}
              </div>
              {report.user.name}
            </div>
            {report.reason}
          </div>
        ))}
      </div>
      {deleteModal && (
        <DeleteConfirmation
          item={deleteModal}
          cancel={setDeleteModal}
          type="review"
          handleDelete={handleDelete}
        />
      )}
      {editReview && (
        <DeleteConfirmation
          item={editReview}
          cancel={setEditReview}
          type="reviewRestore"
          handleDelete={handleRestore}
        />
      )}
    </div>
  );
};
export default ReportReview;
