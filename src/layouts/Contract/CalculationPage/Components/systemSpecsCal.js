import React, { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components

import MDTypography from "components/MDTypography";
import { Card, Grid } from "@mui/material";

import MuiDivider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "components/MDInput";

import { useEffect } from "react";
import { useAsyncDebounce } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateClient } from "redux/Slices/clientSlice";
import MDButton from "components/MDButton";
import { registerPanel } from "redux/Slices/panelSlice";

const SystemSpecsCal = () => {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  const panelData = reduxData.panel.panel;
  const [pricePerWatt, setPricePerWatt] = useState(panelData.pricePerWatt);
  const [installHrPerPanel, setInstallHrPerPanel] = useState(panelData.installHrPerPanel);
  const [freightPerKw, setFreightPerKw] = useState(panelData.freightPerKw);
  const [freightHrPerKw, setFreightHrPerKw] = useState(panelData.freightHrPerKw);
  const totalPriceMaterial =
    panelData.systemKw * pricePerWatt +
    (panelData.systemKw * pricePerWatt * reduxData.client.client.margin) / 100;
  const numberOfPanles = (panelData.systemKw / panelData.panelCapacity) * 1000;
  const totalPriceLabour = numberOfPanles * installHrPerPanel * reduxData.client.client.labourCost;
  const totalFreight =
    freightPerKw * panelData.systemKw * (1 + reduxData.client.client.margin / 100) +
    panelData.freightHrPerKw * reduxData.client.client.labourCost * panelData.systemKw;
  const totalCost = totalFreight + totalPriceLabour + totalPriceMaterial;
  const submitBtClicked = () => {
    // console.log("clikjed", panelData);
    if (panelData.systemKw > 0 && panelData.panelModelName !== "d") {
      const data = {
        ...reduxData.panel.panel,
        pricePerWatt,
        installHrPerPanel,
        freightHrPerKw,
        freightPerKw,
        totalCost,
        clientId: reduxData.client.client._id,
      };

      dispatch(registerPanel(data));
    }
  };
  return (
    <>
      {reduxData.panel && reduxData.panel.panel && reduxData.panel.panel.panelModelName ? (
        <Card>
          <MDBox pt={2} pl={2} pr={2}>
            <MDTypography variant="h6">Material & Labour</MDTypography>
          </MDBox>

          <MDBox m={1}>
            <MDTypography variant="caption">Panel Cost</MDTypography>
            <Grid container spacing={3} pt={1}>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={panelData.systemKw}
                  type="number"
                  label="System Size (KW)"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={pricePerWatt}
                  display="inline"
                  type="number"
                  label="*Price per KW"
                  autoComplete="off"
                  size="small"
                  focused
                  onChange={(e) => setPricePerWatt(e.target.value)}
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={panelData.systemKw * pricePerWatt}
                  type="number"
                  label="Extended Price"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>

              <Grid item lg={3} ml={2}>
                <MDInput
                  value={totalPriceMaterial}
                  display="inline"
                  type="number"
                  label="Total Material Sell"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox m={1}>
            <MDTypography variant="caption">Labour Cost</MDTypography>
            <Grid container spacing={3} pt={1}>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={numberOfPanles}
                  type="number"
                  label="Number of Panels"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={installHrPerPanel}
                  type="number"
                  label="*Installtion Time per panel"
                  autoComplete="off"
                  size="small"
                  focused
                  onChange={(e) => setInstallHrPerPanel(e.target.value)}
                />
              </Grid>

              <Grid item lg={2} ml={2}>
                <MDInput
                  value={installHrPerPanel * numberOfPanles}
                  type="number"
                  label="Total Hrs"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
              <Grid item lg={3} ml={2}>
                <MDInput
                  value={totalPriceLabour}
                  display="inline"
                  type="number"
                  label="Total Labour Sell"
                  autoComplete="off"
                  size="small"
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox m={1}>
            <MDTypography variant="caption">Freight Cost</MDTypography>
            <Grid container spacing={3} pt={1}>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={freightPerKw}
                  type="number"
                  label="*Freight per KW"
                  autoComplete="off"
                  size="small"
                  focused
                  onChange={(e) => setFreightPerKw(e.target.value)}
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={freightPerKw * panelData.systemKw}
                  type="number"
                  label="Extended Price"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={freightHrPerKw}
                  type="number"
                  label="*Freight Labour Time/KW (hr)"
                  autoComplete="off"
                  size="small"
                  focused
                  onChange={(e) => setFreightHrPerKw(e.target.value)}
                />
              </Grid>

              <Grid item lg={3} ml={2}>
                <MDInput
                  value={totalFreight}
                  display="inline"
                  type="number"
                  label="Total Freight Sell"
                  autoComplete="off"
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} direction="column" alignItems="center" justify="center">
              <Grid item lg={4}></Grid>
              <Grid item lg={4}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="success"
                  size="small"
                  onClick={submitBtClicked}
                >
                  Update Changes
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default SystemSpecsCal;
