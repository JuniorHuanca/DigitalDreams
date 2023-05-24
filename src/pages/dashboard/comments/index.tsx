import Header from "@/components/Dashboard/Header";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import { EStateGeneric } from "@/shared/util/types";
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
  console.log(reports);
  return (
    <LayoutDashboard title={"Comments - Dashboard"}>
      <Box m="1.5rem 2.5rem">
        <Header
          title="COMMENTS"
          subtitle="see all the comments that have been reported"
        />
        <div className="flex flex-wrap gap-2 justify-evenly py-2"></div>
      </Box>
    </LayoutDashboard>
  );
};

export default Comments;
