import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/state/store";
import right from "@/assets/right.svg";
import left from "@/assets/left.svg";
import {
  selectMinPageNumLim,
  selectMaxPageNumLim,
  setMaxPageNumLim,
  setMinPageNumLim,
  setCurrentPage,
} from "@/state/globalSlice";
import { toast } from "react-hot-toast";
type Props = {
  items: any;
  itemsPerPage: number;
  currentPage: number;
};
function Pagination({ items, itemsPerPage, currentPage }: Props) {
  const dispatch = useAppDispatch();
  let quepage = 1;
  // const [quepage, setQuepage] = useState<number>(1);

  const pageNumberLimit = 10;
  const minPageNumLim = useSelector(selectMinPageNumLim);
  const maxPageNumLim = useSelector(selectMaxPageNumLim);
  const pages = [];
  const inputRef = useRef(null);
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const totales = Math.ceil(items.length / itemsPerPage);
  const goPage = () => {
    toast.dismiss();
    const handleSubmit = () => {
      if (!Number.isNaN(quepage) && quepage > 0 && quepage <= totales) {
        dispatch(setCurrentPage(quepage));
        toast.dismiss();
      } else {
        dispatch(setCurrentPage(1));
        toast.dismiss();
      }
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.keyCode === 13) {
        handleSubmit();
      }
    };
    toast(
      (t) => (
        <div className="p-4 dark:bg-primary-500 bg-white dark:text-white rounded-xl shadow-md">
          <div className="flex flex-col p-4 gap-2">
            <h4 className="text-xl font-semibold">Select Page</h4>
            <input
              className="dark:bg-primary-400 bg-slate-200 focus:outline-none p-2 rounded-md"
              type="text"
              ref={inputRef}
              autoFocus
              onChange={(e) => (quepage = Number(e.target.value))}
              onKeyDown={handleKeyDown}
            />
            <button
              className="dark:bg-primary-600 bg-slate-100 p-2 rounded-md"
              onClick={handleSubmit}
            >
              Go
            </button>
          </div>
        </div>
      ),
      {
        duration: 999000,
        position: "top-center",
        style: {
          background: "transparent",
          boxShadow: "none",
        },
      }
    );
  };
  const handleNextbtn = () => {
    dispatch(setCurrentPage(currentPage + 1));
    if (currentPage + 1 > maxPageNumLim) {
      dispatch(setMaxPageNumLim(maxPageNumLim + pageNumberLimit));
      dispatch(setMinPageNumLim(minPageNumLim + pageNumberLimit));
    }
  };
  const handlePrevbtn = () => {
    dispatch(setCurrentPage(currentPage - 1));
    if ((currentPage - 1) % pageNumberLimit == 0) {
      dispatch(setMaxPageNumLim(maxPageNumLim - pageNumberLimit));
      dispatch(setMinPageNumLim(minPageNumLim - pageNumberLimit));
    }
  };
  return (
    <div className="flex w-full justify-center items-center text-xl py-2 gap-2">
      <button
        onClick={handlePrevbtn}
        disabled={currentPage == pages[0] ? true : false}
      >
        <Image width={40} height={40} src={left} alt="left" priority />
      </button>

      <div onClick={goPage}>
        {currentPage}/{totales}
      </div>

      <button
        onClick={handleNextbtn}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        <Image width={40} height={40} src={right} alt="right" priority />
      </button>
    </div>
  );
}

export default Pagination;
