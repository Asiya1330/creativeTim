import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useParams } from "react-router-dom";
import { plantsList } from "layouts/solarMonitoring";


function Crm() {
  const { id } = useParams();
  const plant = plantsList.find((plant) => plant.id === parseInt(id));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                {
                  plant ?
                    <>
                      <MDTypography variant="h5">{plant.name}</MDTypography>
                      <MDTypography variant="p">{plant.watts}</MDTypography>
                    </>
                    :
                    <MDTypography variant="p">Comming soon</MDTypography>

                }

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Crm;
