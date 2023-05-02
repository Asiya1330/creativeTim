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
import MDButton from "components/MDButton";
import { useAsyncDebounce } from "react-table";
import Contract from "./MainPage";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "redux/Slices/clientSlice";
import Calculation from "./CalculationPage";
import { setPanel } from "redux/Slices/panelSlice";

import { setRackingRedux } from "redux/Slices/rackingSlice";
function MainContact() {
  const clientId = useParams();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);
  // console.log(reduxData);

  useEffect(() => {
    if (clientId.id !== "new") {
      // console.log("geClient Called");
      dispatch(getClient(clientId));
    }
  }, []);

  useEffect(() => {
    if (
      reduxData.client.client.panel &&
      reduxData.client.client.panel._id &&
      !reduxData.panel.panel.penalBrandName
    ) {
      // console.log("innnnnnnnnnnnnn")
      dispatch(setPanel(reduxData.client.client.panel));
    }
    if (
      reduxData.client.client.racking &&
      reduxData.client.client.racking._id &&
      !reduxData.racking.racking.tinPrice
    ) {
      // console.log("innnnnnnnnnnnnn")
      dispatch(setRackingRedux(reduxData.client.client.racking));
    }
  }, [reduxData.client.client]);

  const [btn1Dis, setBtn1Dis] = useState(true);
  const btn1Cliked = () => {
    setBtn1Dis(true);
  };
  const btn2Cliked = () => {
    setBtn1Dis(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} lg={6}>
            <MDButton
              fullWidth
              color="info"
              type="submit"
              variant="gradient"
              size="small"
              disabled={btn1Dis}
              onClick={btn1Cliked}
            >
              <MDTypography variant="h6">Contract</MDTypography>
            </MDButton>
          </Grid>

          <Grid item xs={6} lg={6}>
            <MDButton
              fullWidth
              color="info"
              type="submit"
              variant="gradient"
              size="small"
              disabled={!btn1Dis}
              onClick={btn2Cliked}
            >
              {" "}
              <MDTypography variant="h6">Calculations</MDTypography>
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      {btn1Dis ? <Contract></Contract> : <Calculation></Calculation>}
      <Footer />
    </DashboardLayout>
  );
}

export default MainContact;
