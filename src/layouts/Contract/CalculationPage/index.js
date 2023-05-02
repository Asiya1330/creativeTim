// @mui material components
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import { Card, Grid } from "@mui/material";

import MuiDivider from "@mui/material/Divider";

import { useState } from "react";
import MDInput from "components/MDInput";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ClientDefaults from "./Components/clientDefalus";
import SystemSpecsCal from "./Components/systemSpecsCal";
import RackingCal from "./Components/rackingCal";

function Calculation() {
  return (
    <MDBox mt={6} mb={3}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <ClientDefaults></ClientDefaults>
        </Grid>

        <Grid item xs={12} lg={12}>
          <SystemSpecsCal></SystemSpecsCal>
        </Grid>
        <Grid item xs={12} lg={12}>
          <RackingCal></RackingCal>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Calculation;
