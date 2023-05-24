import { postOneReportReview } from "@/state/products/product/productSlice";
import { useAppDispatch } from "@/state/store";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiFlag2Line } from "react-icons/ri";
type Props = {
  setShowModal: (value: boolean) => void;
  review: any;
  user: any;
};

const Reports = ({ setShowModal, review, user }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedOption) return toast.error("Select an option please");
    if (selectedOption === "other") {
      if (!comment) return toast.error("Comment is required");
      await dispatch(
        postOneReportReview({
          userId: user.id,
          reason: comment,
          reviewId: review.id,
        })
      );
    }
    await dispatch(
      postOneReportReview({
        userId: user.id,
        reason: selectedOption,
        reviewId: review.id,
      })
    );
    setShowModal(false);
    setSelectedOption("");
    setComment("");
    toast.success(
      "Comment reported successfully, the changes will soon be reflected on the page"
    );
  };

  return (
    // <div className="flex justify-center items-center fixed top-0 right-[50%] translate-y-1/2 translate-x-1/2 w-[50%] h-[50%] bg-black/60 z-10">
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-10">
      <div className="flex flex-col items-center w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto dark:bg-primary-500 bg-white p-6 gap-2 rounded-lg">
        <h2 className="text-2xl font-bold">Report Comment</h2>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="spam"
                checked={selectedOption === "spam"}
                onChange={handleOptionChange}
                className="appearance-none rounded-full h-4 w-4 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 ease-in-out"
              />
              Spam
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="fake-information"
                checked={selectedOption === "fake-information"}
                onChange={handleOptionChange}
                className="appearance-none rounded-full h-4 w-4 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 ease-in-out"
              />
              Fake information
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="inappropriate-behavior"
                checked={selectedOption === "inappropriate-behavior"}
                onChange={handleOptionChange}
                className="appearance-none rounded-full h-4 w-4 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 ease-in-out"
              />
              Inappropriate behavior
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="offensive-content"
                checked={selectedOption === "offensive-content"}
                onChange={handleOptionChange}
                className="appearance-none rounded-full h-4 w-4 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 ease-in-out"
              />
              Offensive content
            </label>
          </div>
          <div className="flex flex-col">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="other"
                checked={selectedOption === "other"}
                onChange={handleOptionChange}
                className="appearance-none rounded-full h-4 w-4 border-2 border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors duration-200 ease-in-out"
              />
              Other
            </label>
            {selectedOption === "other" && (
              <textarea
                className={`dark:bg-primary-600 bg-slate-200 w-full dark:text-white focus:outline-none p-4 rounded-r-sm`}
                value={comment}
                onChange={handleCommentChange}
                disabled={selectedOption !== "other"}
                style={{ resize: "vertical", maxHeight: "200px" }}
              />
            )}
          </div>
          <div className="flex gap-4 justify-around">
            <button
              type="submit"
              className={`flex justify-center items-center gap-4 text-lg text-white p-3 w-full hover:bg-blue-600 bg-blue-500 dark:hover:bg-indigo-800 dark:bg-indigo-700 rounded-lg hover:scale-105 transition-transform`}
            >
              Report <RiFlag2Line />
            </button>
            <button
              type="button"
              className={`flex justify-center items-center gap-4 text-lg text-white p-3 w-full hover:bg-red-600 bg-red-500 rounded-lg hover:scale-105 transition-transform`}
              onClick={() => setShowModal(false)}
            >
              Cancel <AiOutlineCloseCircle />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reports;
