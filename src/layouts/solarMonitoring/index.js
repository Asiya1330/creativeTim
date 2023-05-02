import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DataTable from "examples/Tables/DataTable/DataTableBodyCell";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import Data1 from "layouts/solarMonitoring/Data1";
import { getData } from "../../redux/api/handleAPI";
import { AppBar, Icon, Tab, Tabs } from "@mui/material";

import breakpoints from "assets/theme/base/breakpoints";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Link } from "react-router-dom";

export const plantsList = [
  { id: 12, name: 'plant 1', watts: "123dswvw" },
  { id: 124, name: 'plant 2', watts: "1232wsvw" },
  { id: 123, name: 'plant 3', watts: "12311vw" }
]

function SolarMonitor() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [dataApi, setDataApi] = useState(null);
  const [w, setW] = useState(false);
  //const { columns, rows } = {Data1(dataApi)};
  const [columns, setColumns] = useState();
  const [rows, setRows] = useState();

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const apiCalled = async () => {
    const res = await getData(tabValue);
    console.log(res);
    setDataApi(res);
  };
  useEffect(() => {
    apiCalled();
  }, [tabValue]);
  useEffect(() => {
    if (dataApi) {
      setColumns(Data1(dataApi).columns);
      setRows(Data1(dataApi).rows);
      setW(true);
    }
  }, [dataApi]);
  const handleSetTabValue = (event, newVal) => {
    console.log(newVal);
    setTabValue(newVal);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox p={2} mt={4}>
        <Grid item xs={12}>
          <Card>
            <Grid item>
              <AppBar position="static">
                <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                  <Tab label="All Plants" value={plantsList} />
                  <Tab label="Commissioning Unfinished" value="fdewsa" />
                </Tabs>
              </AppBar>
            </Grid>
            <MDBox pt={3}>

              <Table>
                <TableBody>
                  {plantsList.map((plant) => (
                    <TableRow key={plant.id}>
                      <TableCell>
                        {/* <Link to={`/plants/${plant.id}`}>{plant.id}</Link> */}
                      </TableCell>
                      <TableCell>{plant.name}</TableCell>
                      <TableCell>{plant.watts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {w ? (
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              ) : (
                <></>
              )}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            {/* <Card>
              <MDBox p={2}>
                <MDTypography variant="body2">Coming Soon</MDTypography>
              </MDBox>
            </Card> */}
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default SolarMonitor;
