// type Props = {}

// const Dashboard = (props: Props) => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard

import BreakdownChart from "@/components/Dashboard/BreakdownChart";
import DataGridCustom from "@/components/DataGridCustom";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Dashboard/Header";
import OverviewChart from "@/components/Dashboard/OverviewChart";
import StatBox from "@/components/Dashboard/StatBox";
import { columns } from "@/shared/util/data";
import { ITheme } from "@/shared/util/types";
import { useGetDashboardQuery } from "@/state/api";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import { MdCategory } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
type Props = {};

const Dashboard = (props: Props) => {
  const theme: ITheme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery(null);
  return (
    <LayoutDashboard title={"Dashboard"}>
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              {/* brands: 48
              <br />
              categories: 16
              <br />
              subcategories: 34
              <br />
              products: 828
              <br /> */}
              <AiOutlineCloudUpload size={28} /> POST DATA
            </Button>
          </Box>
        </FlexBetween>

        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          {/* ROW 1 */}
          <StatBox
            title="Total Customers"
            value={data && data.totalCustomers}
            increase={(data && `${data.customers}%`) || "0%"}
            description="Since last year"
            icon={
              <Email
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title="Sales Today"
            value={data && data.todayStats?.totalSales}
            increase={(data && `${data.dailySales}%`) || "0%"}
            description="Since last day"
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            // backgroundColor={theme.palette.background.alt}
            p="1rem"
            borderRadius="0.55rem"
            sx={{
              backgroundColor: `${theme.palette.background.alt}`,
            }}
          >
            <OverviewChart view="sales" isDashboard={true} />
          </Box>
          <StatBox
            title="Monthly Sales"
            value={data && data.thisMonthStats?.totalSales}
            increase={(data && `${data.monthlySales}%`) || "0%"}
            description="Since last month"
            icon={
              <PersonAdd
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title="Yearly Sales"
            value={data && data.yearlySalesTotal}
            increase={(data && `${data.yearSales}%`) || "0%"}
            description="Since last year"
            icon={
              <Traffic
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 3"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
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
                backgroundColor: theme.palette.background.alt,
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
              getRowId={(row) => row.id}
              rows={(data && data.transactions) || []}
              columns={columns as any}
              components={{ Toolbar: DataGridCustom }}
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 3"
            // backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
            sx={{
              backgroundColor: `${theme.palette.background.alt}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100] }}
            >
              Sales By Category
            </Typography>
            <BreakdownChart isDashboard={true} />
            <Typography
              p="0 0.6rem"
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary[200] }}
            >
              Breakdown of real states and information via category for revenue
              made for this year and total sales.
            </Typography>
          </Box>
        </Box>
      </Box>
    </LayoutDashboard>
  );
};

export default Dashboard;
