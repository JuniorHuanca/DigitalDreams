import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  editReview: any;
  labels: any;
  formattedCreatedAt: any;
  formattedUpdatedAt: any;
  reviewFields: any;
  handleEdit: () => void;
  setEditReview: (value: any) => void;
  setReviewFields: (value: any) => void;
};

const EditReview = ({
  editReview,
  labels,
  formattedCreatedAt,
  formattedUpdatedAt,
  reviewFields,
  handleEdit,
  setEditReview,
  setReviewFields,
}: Props) => {
  const [value, setValue] = useState<number>(editReview.rating);
  const [hover, setHover] = useState(-1);
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  useEffect(() => {
    setReviewFields({
      reviewId: editReview.id,
      description: editReview.description,
      rating: editReview.rating,
    });
  }, [editReview]);

  return (
    <div className="flex flex-col">
      <p className="flex gap-2 items-center">
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
              });
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            size="large"
          />
          {value !== null && <div>{labels[hover !== -1 ? hover : value]}</div>}
        </div>
      </p>
      <p className="text-gray-500">Created: {formattedCreatedAt} UTC</p>
      {formattedCreatedAt !== formattedUpdatedAt && (
        <p className="text-gray-400">Modified: {formattedUpdatedAt} UTC</p>
      )}
      <textarea
        className="min-h-[125px] h-[125px] bg-white dark:bg-primary-500 rounded-lg focus:outline-none p-4"
        placeholder="Write your opinion about the product here. Include your comments on its quality, functionality, ease of use, value, and anything else you think is important. Your feedback is valuable to us and to other users, so don't hold back!"
        value={reviewFields.description}
        onChange={(e) =>
          setReviewFields({
            ...reviewFields,
            description: e.target.value,
          })
        }
      ></textarea>
      <div className="w-full flex justify-evenly mt-2">
        <button
          className="p-3 rounded-lg bg-indigo-500 text-white"
          onClick={handleEdit}
        >
          Update
        </button>
        <button
          className="p-3 rounded-lg bg-red-500 text-white"
          type="button"
          onClick={() => setEditReview(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditReview;
