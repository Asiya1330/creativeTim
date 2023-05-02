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
import CustomerForm from "./Components/CustomerForm";
import { useState } from "react";
import MDInput from "components/MDInput";
import SystemSpecs from "./Components/SystemSpecs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Racking from "./Components/Racking";

function Contract() {
  return (
    <MDBox mt={6} mb={3}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <CustomerForm></CustomerForm>
        </Grid>

        <Grid item xs={12} lg={12}>
          <SystemSpecs></SystemSpecs>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Racking></Racking>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Contract;
