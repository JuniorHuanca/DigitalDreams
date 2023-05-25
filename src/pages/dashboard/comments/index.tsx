import Header from "@/components/Dashboard/Header";
import ReportReview from "@/components/Dashboard/ReportReview";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import LoaderModal from "@/components/Loaders/LoaderModal";
import { EStateGeneric, IReview } from "@/shared/util/types";
import {
  selectDeleteReviewStatus,
  selectRestoreReviewStatus,
} from "@/state/products/product/productSlice";
import {
  getAllReports,
  selectAllReports,
  selectAllReportsStatus,
} from "@/state/reviews/reviews/reviewsSlice";
import { useAppDispatch } from "@/state/store";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Comments = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const reportsStatus = useSelector(selectAllReportsStatus);
  const statusDeleteReview = useSelector(selectDeleteReviewStatus);
  const statusRestoreReview = useSelector(selectRestoreReviewStatus);
  const reports = useSelector(selectAllReports);
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (reportsStatus === EStateGeneric.IDLE) {
          await dispatch(getAllReports());
        }
      }
    })();

    // return () => {
    //   dispatch(cleanUpProductsDashboard());
    // };
  }, []);
  return (
    <LayoutDashboard title={"Comments - Dashboard"}>
      <Box m={{ xs: ".5rem", lg: "1.5rem 2.5rem" }}>
        <Header
          title="COMMENTS"
          subtitle="see all the comments that have been reported"
        />
        <div className="flex flex-wrap flex-col gap-2 justify-evenly py-2 w-full sm:w-full p-2">
          {reports.map((review: IReview, index) => (
            <ReportReview key={index} review={review} />
          ))}
        </div>
      </Box>
      {statusDeleteReview === EStateGeneric.PENDING && <LoaderModal />}
      {statusRestoreReview === EStateGeneric.PENDING && <LoaderModal />}
    </LayoutDashboard>
  );
};

export default Comments;
