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
import { registerRacking } from "redux/Slices/rackingSlice";

const RackingCal = () => {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  const RackingData = reduxData.racking.racking;
  const [tinUnitPrice, setTinUnitPrice] = useState(RackingData.tinUnitPrice);
  const [addOnPrice, setAddOnPrice] = useState(
    RackingData.tilePrice > 0 ? RackingData.tilePrice : RackingData.kliplokPrice
  );
  const [addOnHr, setAddOnHr] = useState(
    RackingData.tileHr > 0 ? RackingData.tileHr : RackingData.kliplokHr
  );
  const [tiltPrice, setTiltPrice] = useState(RackingData.tiltPrice);
  const [tiltHr, setTiltHr] = useState(RackingData.tiltHr);
  const [groundMountLabourHr, setGroundMountLabourHr] = useState(RackingData.groundMountLabourHr);
  const [groundMountSundries, setGroundMountSundries] = useState(RackingData.groundMountSundries);
  const [groundMountCivil, setGroundMountCivil] = useState(RackingData.groundMountCivil);
  const [groundMountPrice, setGroundMountPrice] = useState(RackingData.groundMountPrice);

  const [twoStrotyCost, setTwoStrotyCost] = useState(RackingData.twoStrotyCost);
  const [twoStroyLabourHr, setTwoStroyLabourHr] = useState(RackingData.twoStroyLabourHr);
  // const [tinUnitPrice, setTinUnitPrice] = useState(RackingData.tinUnitPrice);
  // const [tinUnitPrice, setTinUnitPrice] = useState(RackingData.tinUnitPrice);
  // const [installHrPerPanel, setInstallHrPerPanel] = useState(panelData.installHrPerPanel);
  // const [freightPerKw, setFreightPerKw] = useState(panelData.freightPerKw);
  // const [freightHrPerKw, setFreightHrPerKw] = useState(panelData.freightHrPerKw);
  const totalPriceTin =
    reduxData.panel.panel.systemKw * tinUnitPrice +
    (reduxData.panel.panel.systemKw * tinUnitPrice * reduxData.client.client.margin) / 100;
  // const numberOfPanles = (panelData.systemKw / panelData.panelCapacity) * 1000;
  const totalAddOn =
    addOnPrice * reduxData.panel.panel.systemKw * (1 + reduxData.client.client.margin / 100) +
    addOnHr * reduxData.panel.panel.systemKw * reduxData.client.client.labourCost;
  const totalTilt =
    tiltPrice * reduxData.panel.panel.systemKw * (1 + reduxData.client.client.margin / 100) +
    tiltHr * reduxData.panel.panel.systemKw * reduxData.client.client.labourCost;
  const totalTwoStory =
    twoStrotyCost * reduxData.panel.panel.systemKw * (1 + reduxData.client.client.margin / 100) +
    twoStroyLabourHr * reduxData.panel.panel.systemKw * reduxData.client.client.labourCost;
  const temp1 =
    reduxData.panel.panel.systemKw * (groundMountSundries + groundMountCivil + groundMountPrice);
  const totaGround =
    temp1 * (1 + reduxData.client.client.margin / 100) +
    groundMountLabourHr * reduxData.panel.panel.systemKw * reduxData.client.client.labourCost;
  // const totalFreight =
  //   freightPerKw * panelData.systemKw * (1 + reduxData.client.client.margin / 100) +
  //   panelData.freightHrPerKw * reduxData.client.client.labourCost * panelData.systemKw;
  // const totalCost = totalFreight + totalPriceLabour + totalPriceMaterial;

  const submitBtClicked = () => {
    const data = {
      ...reduxData.racking.racking,
      tiltPrice: tiltPrice ? tiltPrice : 0,
      tiltHr: tiltHr ? tiltHr : 0,
      groundMountLabourHr: groundMountLabourHr ? groundMountLabourHr : 0,
      groundMountSundries: groundMountSundries ? groundMountSundries : 0,
      groundMountCivil: groundMountCivil ? groundMountCivil : 0,
      groundMountPrice: groundMountPrice ? groundMountPrice : 0,
      twoStrotyCost: twoStrotyCost ? twoStrotyCost : 0,
      twoStroyLabourHr: twoStroyLabourHr ? twoStroyLabourHr : 0,
      tinUnitPrice: tinUnitPrice ? tinUnitPrice : 0,
      tileHr: addOnHr ? (RackingData.tileHr > 0 ? addOnHr : 0) : 0,
      tilePrice: addOnPrice ? (RackingData.tilePrice > 0 ? addOnPrice : 0) : 0,
      kliplokHr: addOnHr ? (RackingData.tileHr > 0 ? 0 : addOnHr) : 0,
      kliplokPrice: addOnPrice ? (RackingData.tilePrice > 0 ? 0 : addOnPrice) : 0,
      clientId: reduxData.client.client._id,
    };

    // dispatch(registerRacking(data));
  };
  return (
    <>
      {reduxData.racking &&
      reduxData.racking.racking &&
      reduxData.racking.racking.tinUnitPrice &&
      reduxData.panel.panel.panelModelName ? (
        <Card>
          <MDBox pt={2} pl={2} pr={2}>
            <MDTypography variant="h6">Racking Calculation</MDTypography>
          </MDBox>

          <MDBox m={1}>
            <MDTypography variant="caption">Default Tin Racking</MDTypography>
            <Grid container spacing={3} pt={1}>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={reduxData.panel.panel.systemKw}
                  type="number"
                  label="System Size (KW)"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={tinUnitPrice}
                  display="inline"
                  type="Number"
                  label="*Tin Racking Unit Price"
                  autoComplete="off"
                  size="small"
                  onChange={(e) => setTinUnitPrice(e.target.value)}
                />
              </Grid>
              <Grid item lg={2} ml={2}>
                <MDInput
                  value={reduxData.panel.panel.systemKw * tinUnitPrice}
                  type="number"
                  label="Extended Price"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>

              <Grid item lg={3} ml={2}>
                <MDInput
                  value={totalPriceTin}
                  display="inline"
                  type="number"
                  label="Total Tin Price"
                  autoComplete="off"
                  size="small"
                  readOnly
                />
              </Grid>
            </Grid>
          </MDBox>
          {reduxData.racking &&
          reduxData.racking.racking &&
          (reduxData.racking.racking.kliplokPrice > 0 ||
            reduxData.racking.racking.tilePrice > 0) ? (
            <MDBox m={1}>
              <MDTypography variant="caption">
                {reduxData.racking.racking.tilePrice > 0 ? (
                  <>Extra Tile Cost</>
                ) : (
                  <>Extra Kliplok Cost</>
                )}
              </MDTypography>
              <Grid container spacing={3} pt={1}>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={addOnPrice}
                    type="number"
                    label="*Extra price add"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setAddOnPrice(e.target.value)}
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={addOnHr}
                    type="number"
                    label="*Installtion Time/KW"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setAddOnHr(e.target.value)}
                  />
                </Grid>

                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={addOnHr * reduxData.panel.panel.systemKw}
                    type="number"
                    label="Total Hrs"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={totalAddOn}
                    display="inline"
                    type="number"
                    label="Total Sell Price"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
            </MDBox>
          ) : (
            <></>
          )}

          {reduxData.racking &&
          reduxData.racking.racking &&
          reduxData.racking.racking.tiltPrice > 0 ? (
            <MDBox m={1}>
              <MDTypography variant="caption">Extra Tilt Cost</MDTypography>
              <Grid container spacing={3} pt={1}>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={tiltPrice}
                    type="number"
                    label="*Extra price add"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setTiltPrice(e.target.value)}
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={tiltHr}
                    type="number"
                    label="*Installtion Time/KW"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setTiltHr(e.target.value)}
                  />
                </Grid>

                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={tiltHr * reduxData.panel.panel.systemKw}
                    type="number"
                    label="Total Hrs"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={totalTilt}
                    display="inline"
                    type="number"
                    label="Total Sell Price"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
            </MDBox>
          ) : (
            <></>
          )}
          {reduxData.racking &&
          reduxData.racking.racking &&
          reduxData.racking.racking.twoStroyLabourHr > 0 ? (
            <MDBox m={1}>
              <MDTypography variant="caption">Extra 2 Story Cost</MDTypography>
              <Grid container spacing={3} pt={1}>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={twoStrotyCost}
                    type="number"
                    label="*Extra price add"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setTwoStrotyCost(e.target.value)}
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={twoStroyLabourHr}
                    type="number"
                    label="*Installtion Time/KW"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setTwoStroyLabourHr(e.target.value)}
                  />
                </Grid>

                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={twoStroyLabourHr * reduxData.panel.panel.systemKw}
                    type="number"
                    label="Total Hrs"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={totalTwoStory}
                    display="inline"
                    type="number"
                    label="Total Sell Price"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
            </MDBox>
          ) : (
            <></>
          )}
          {reduxData.racking &&
          reduxData.racking.racking &&
          reduxData.racking.racking.groundMountPrice > 0 ? (
            <MDBox m={1}>
              <MDTypography variant="caption">Extra GroundMount Cost</MDTypography>
              <Grid container spacing={3} pt={1}>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={groundMountPrice}
                    type="number"
                    label="*Extra price add"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setGroundMountPrice(e.target.value)}
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={groundMountLabourHr}
                    type="number"
                    label="*Installtion Time/KW"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setGroundMountLabourHr(e.target.value)}
                  />
                </Grid>

                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={groundMountCivil}
                    type="number"
                    label="GroundMount Civil Price/KW "
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setGroundMountCivil(e.target.value)}
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={groundMountSundries}
                    display="inline"
                    type="number"
                    label="Sundries"
                    autoComplete="off"
                    size="small"
                    onChange={(e) => setGroundMountSundries(e.target.value)}
                  />
                </Grid>
                <Grid item lg={2} ml={2}>
                  <MDInput
                    value={totaGround}
                    display="inline"
                    type="number"
                    label="Total Sell Price"
                    autoComplete="off"
                    size="small"
                    readOnly
                  />
                </Grid>
              </Grid>
            </MDBox>
          ) : (
            <></>
          )}
          <Grid
            container
            spacing={4}
            mb={1}
            direction="column"
            alignItems="center"
            justify="center"
          >
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
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default RackingCal;
