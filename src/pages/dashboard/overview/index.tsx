import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "@/components/Dashboard/Header";
import OverviewChart from "@/components/Dashboard/OverviewChart";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";

type Props = {};
const Overview = (props: Props) => {
  const [view, setView] = useState("units");

  return (
    <LayoutDashboard title={"Overview - Dashboard"}>
      <Box m="1.5rem 2.5rem">
        <Header
          title="OVERVIEW"
          subtitle="Overview of general revenue and profit"
        />
        <Box height="75vh">
          <FormControl sx={{ mt: "1rem" }}>
            <InputLabel>View</InputLabel>
            <Select
              value={view}
              label="View"
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="units">Units</MenuItem>
            </Select>
          </FormControl>
          <OverviewChart view={view} isDashboard={false} />
        </Box>
      </Box>
    </LayoutDashboard>
  );
};

export default Overview;
