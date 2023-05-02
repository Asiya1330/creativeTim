// @mui material components
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import { Avatar, Card, Grid, MenuItem, Select, Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MuiDivider from "@mui/material/Divider";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllClient } from "redux/Slices/allClientsSlice";
import { useEffect } from "react";
import { setPanelToNull } from "redux/Slices/panelSlice";
import { setClientToNull } from "redux/Slices/clientSlice";
function Dashboard() {
  const [showSpecs, setShowSpecs] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newContactClicked = () => {
    navigate("/contract/new");
  };
  useEffect(() => {
    dispatch(getAllClient());
    dispatch(setPanelToNull());
    dispatch(setClientToNull());
  }, []);

  const reduxData = useSelector((state) => state);

  const clients = reduxData.clients;
  const loading = reduxData.clients.loading;
  const error = reduxData.clients.error;
  // console.log(reduxData);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3} mb={3}>
        <Grid container spacing={0} direction="column" alignItems="flex-end" justify="right">
          <Grid mr={1} mb={2} item lg={4}>
            <MDButton variant="gradient" color="info" size="medium" onClick={newContactClicked}>
              + New Contract
            </MDButton>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox pt={2} pl={2} pr={2}>
                <MDTypography variant="h5">Draft Contracts</MDTypography>
              </MDBox>

              <MuiDivider></MuiDivider>
              {!loading ? (
                clients.users.map((client, index) => {
                  return (
                    <MDBox key={index} pt={2} pb={2} pl={2} pr={2}>
                      <Link to={`/contract/${client._id}`}>
                        <MDTypography key={index} variant="h6">
                          {client.firstName}
                        </MDTypography>
                      </Link>
                    </MDBox>
                  );
                })
              ) : (
                <Skeleton m={2} variant="rectangular" height={100} animation="wave" />
              )}
            </Card>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox pt={2} pl={2} pr={2}>
                <MDTypography variant="h5">Saved Contracts</MDTypography>
              </MDBox>

              <MuiDivider></MuiDivider>

              <MDBox pt={2} pb={2} pl={2} pr={2}>
                <MDTypography variant="body2">No saved contract Found</MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
