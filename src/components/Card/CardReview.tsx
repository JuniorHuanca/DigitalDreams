import { Rating } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Avatar from "react-avatar";
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";

type Props = {
  review: any;
  user: any;
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
  console.log(review);
  console.log(user);
  const createdAt = new Date(review.createdAt);
  const updatedAt = new Date(review.updatedAt);
  const [errorImage, setErrorImage] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    setShowModal(true);
  }
  const formattedCreatedAt = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
  const formattedUpdatedAt = `${updatedAt.getDate()}/${
    updatedAt.getMonth() + 1
  }/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}`;
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
              onError={() => setErrorImage(true)}
            />
          ) : (
            <Avatar name={review.user.name} size="100%" round={true} />
          )}
        </div>
        {review.user.name}
      </div>
      <div className="flex flex-col">
        <p className="flex gap-2 items-center">
          <Rating value={review.rating} precision={0.1} size="large" readOnly />
          <span className="flex font-semibold">{labels[review.rating]}</span>
        </p>
        <p className="text-gray-500">created: {formattedCreatedAt} UTC</p>
        <p className="text-gray-500">updated: {formattedUpdatedAt} UTC</p>

        <p>{review.description}</p>
      </div>
      <div className="absolute top-0 right-0 text-2xl p-2">
        {review.user.id === user?.id && (
          <button
            className="text-green-500 hover:animate-bell-swing-scale hover:bg-primary-500 rounded-xl p-1"
            type="button"
          >
            <BiEdit />
          </button>
        )}
        {review.user.id === user?.id ||
          review.user.role === "Admin" ||
          (review.user.role === "Manager" && (
            <button
              className="text-red-500 hover:animate-bell-swing-scale hover:bg-primary-500 rounded-xl p-1"
              type="button"
            >
              <BsFillTrashFill />
            </button>
          ))}
        {user?.name && (
          <button
            className="text-yellow-500 hover:animate-bell-swing-scale hover:bg-primary-500 rounded-xl p-1"
            type="button"
          >
            <MdReportProblem />
          </button>
        )}
        {!user?.name && (
          <button
            className="text-yellow-500 hover:animate-bell-swing-scale hover:bg-primary-500 rounded-xl p-1"
            type="button"
            onClick={handleClick}
          >
            <MdReportProblem />
          </button>
        )}
        {showModal && (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default CardReview;
