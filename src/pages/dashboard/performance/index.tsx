import CustomColumnMenu from "@/components/CustomColumnMenu";
import DataGridCustom from "@/components/DataGridCustom";
import Header from "@/components/Dashboard/Header";
import { ITheme } from "@/shared/util/types";
import { useGetUserPerformanceQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";

type Props = {};

const Performance = (props: Props) => {
  const theme: ITheme = useTheme();
  const userId = useSelector((state: any) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params: { value: string | any[] }) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params: { value: any }) =>
        `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <LayoutDashboard title={"Performance - Dashboard"}>
      <Box m="1.5rem 2.5rem">
        <Header
          title="PERFORMANCE"
          subtitle="Track your Affiliate Sales Performance Here"
        />
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row: { _id: any }) => row._id}
            rows={(data && data.sales) || []}
            columns={columns as any}
            components={{
              Toolbar: DataGridCustom,
              ColumnMenu: CustomColumnMenu,
            }}
          />
        </Box>
      </Box>
    </LayoutDashboard>
  );
};

export default Performance;
