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
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";

import MDButton from "components/MDButton";
import { getDefaultRacking } from "redux/Slices/rackingSlice";
import { useEffect } from "react";
import { setRackingRedux } from "redux/Slices/rackingSlice";
import { registerRacking } from "redux/Slices/rackingSlice";

const Racking = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);

  //////////////////////////////////////////////  States /////////////////////////////////////////////
  const [racking, setRacking] = useState("tin");
  const [rackingType, setRackingType] = useState("d");
  const [twoStory, setTwoStory] = useState(false);
  const [groundMount, setGroundMount] = useState(false);
  const [data, setData] = useState({});
  // console.log(reduxData);

  // useEffect(() => {
  //   if (modelName === "d" && allPanels.length > 0 && panelBrandName!=="d") {
  //     setModelName(reduxData.panel.panel.value);
  //   }
  // }, [reduxData.allPanel]);

  useEffect(() => {
    if (reduxData.racking.defaultRacking && reduxData.racking.defaultRacking.tinUnitPrice > 0) {
    } else {
      dispatch(getDefaultRacking());
    }
    if (
      reduxData.racking.racking &&
      reduxData.racking.racking.tinUnitPrice > 0 &&
      reduxData.racking.racking.tilePrice > 0
    ) {
      setRacking("tile");
    } else if (
      reduxData.racking.racking &&
      reduxData.racking.racking.tinUnitPrice > 0 &&
      reduxData.racking.racking.kliplokPrice > 0
    ) {
      setRacking("kliplok");
    }
    if (
      reduxData.racking.racking &&
      reduxData.racking.racking.tinUnitPrice > 0 &&
      reduxData.racking.racking.tiltPrice > 0
    ) {
      setRackingType("tilt");
    } else {
      setRackingType("flush");
    }
    if (
      reduxData.racking.racking &&
      reduxData.racking.racking.tinUnitPrice > 0 &&
      reduxData.racking.racking.twoStrotyCost > 0
    ) {
      setTwoStory(true);
    }
    if (
      reduxData.racking.racking &&
      reduxData.racking.racking.tinUnitPrice > 0 &&
      reduxData.racking.racking.groundMountPrice > 0
    ) {
      setGroundMount(true);
    }
  }, [reduxData.racking]);
  useEffect(() => {}, [reduxData.racking]);
  useEffect(() => {
    if (
      reduxData.racking.defaultRacking &&
      reduxData.racking.defaultRacking.tinUnitPrice &&
      rackingType !== "d"
    ) {
      let data = {
        tinUnitPrice: reduxData.racking.defaultRacking.tinUnitPrice,
      };
      if (racking === "tile") {
        data = {
          ...data,
          tilePrice: reduxData.racking.defaultRacking.tilePrice,
          tileHr: reduxData.racking.defaultRacking.tileHr,
        };
      }
      if (racking === "kliplok") {
        data = {
          ...data,
          kliplokHr: reduxData.racking.defaultRacking.kliplokHr,
          kliplokPrice: reduxData.racking.defaultRacking.kliplokPrice,
        };
      }
      if (rackingType === "tilt") {
        data = {
          ...data,
          tiltHr: reduxData.racking.defaultRacking.tiltHr,
          tiltPrice: reduxData.racking.defaultRacking.tiltPrice,
        };
      }
      if (groundMount === true) {
        data = {
          ...data,
          groundMountPrice: reduxData.racking.defaultRacking.groundMountPrice,
          groundMountLabourHr: reduxData.racking.defaultRacking.groundMountLabourHr,
          groundMountCivil: reduxData.racking.defaultRacking.groundMountCivil,
          groundMountSundries: reduxData.racking.defaultRacking.groundMountSundries,
        };
      }
      if (twoStory === true) {
        data = {
          ...data,
          twoStrotyCost: reduxData.racking.defaultRacking.twoStrotyCost,
          twoStroyLabourHr: reduxData.racking.defaultRacking.twoStroyLabourHr,
        };
      }
      dispatch(setRackingRedux(data));
    }
  }, [rackingType, twoStory, groundMount]);

  //////////////////////////////////// Change Handlers /////////////////////////

  const rackingTypeChange = (e) => {
    setRackingType(e.target.value);
  };
  const btnSubmitClicked = () => {
    let data = {
      groundMountCivil:
        reduxData.racking.racking && reduxData.racking.racking.groundMountCivil
          ? reduxData.racking.racking.groundMountCivil
          : 0,
      groundMountLabourHr:
        reduxData.racking.racking && reduxData.racking.racking.groundMountLabourHr
          ? reduxData.racking.racking.groundMountLabourHr
          : 0,
      groundMountPrice:
        reduxData.racking.racking && reduxData.racking.racking.groundMountPrice
          ? reduxData.racking.racking.groundMountPrice
          : 0,
      groundMountSundries:
        reduxData.racking.racking && reduxData.racking.racking.groundMountSundries
          ? reduxData.racking.racking.groundMountSundries
          : 0,
      kliplokHr:
        reduxData.racking.racking && reduxData.racking.racking.kliplokHr
          ? reduxData.racking.racking.kliplokHr
          : 0,
      kliplokPrice:
        reduxData.racking.racking && reduxData.racking.racking.kliplokPrice
          ? reduxData.racking.racking.kliplokPrice
          : 0,
      tileHr:
        reduxData.racking.racking && reduxData.racking.racking.tileHr
          ? reduxData.racking.racking.tileHr
          : 0,
      tilePrice:
        reduxData.racking.racking && reduxData.racking.racking.tilePrice
          ? reduxData.racking.racking.tilePrice
          : 0,
      tiltHr:
        reduxData.racking.racking && reduxData.racking.racking.tiltHr
          ? reduxData.racking.racking.tiltHr
          : 0,
      tiltPrice:
        reduxData.racking.racking && reduxData.racking.racking.tiltPrice
          ? reduxData.racking.racking.tiltPrice
          : 0,
      tinUnitPrice:
        reduxData.racking.racking && reduxData.racking.racking.tinUnitPrice
          ? reduxData.racking.racking.tinUnitPrice
          : 0,
      twoStrotyCost:
        reduxData.racking.racking && reduxData.racking.racking.twoStrotyCost
          ? reduxData.racking.racking.twoStrotyCost
          : 0,
      twoStroyLabourHr:
        reduxData.racking.racking && reduxData.racking.racking.twoStroyLabourHr
          ? reduxData.racking.racking.twoStroyLabourHr
          : 0,
    };
    data = {
      ...data,
      clientId: reduxData.client.client._id,
    };

    dispatch(registerRacking(data));
  };

  return (
    <Card>
      <MDBox pt={2} pl={2} pr={2}>
        <MDTypography variant="h6">Racking Specification</MDTypography>
      </MDBox>
      <MuiDivider></MuiDivider>

      <MDBox pb={2} pl={2} pr={2}>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select"
              fullWidth
              value={racking}
              sx={{ height: "2.7rem" }}
              onChange={(e) => {
                setRacking(e.target.value);
                setRackingType("d");
                // setPanelBrandName(e.target.value);
              }}
            >
              <MenuItem value={"tin"}>Tin</MenuItem>
              <MenuItem value={"tile"}>Tile</MenuItem>
              <MenuItem value={"kliplok"}>kliplok</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={3}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select"
              fullWidth
              value={rackingType}
              sx={{ height: "2.7rem" }}
              onChange={rackingTypeChange}
            >
              <MenuItem value={"d"}>Select Reacking Type</MenuItem>
              <MenuItem value={"flush"}>Flush</MenuItem>
              <MenuItem value={"tilt"}>Tilt</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={3}>
            <MDTypography display="inline" variant="body2">
              2 story domestic
            </MDTypography>
            <Checkbox
              display="inline"
              checked={twoStory}
              onChange={() => setTwoStory(!twoStory)}
            ></Checkbox>
          </Grid>
          <Grid item lg={3}>
            <MDTypography display="inline" variant="body2">
              Ground mount
            </MDTypography>
            <Checkbox
              display="inline"
              checked={groundMount}
              onChange={() => setGroundMount(!groundMount)}
            ></Checkbox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <Grid item lg={4}></Grid>
          <Grid item lg={4}>
            <MDButton
              type="submit"
              variant="gradient"
              color="success"
              size="medium"
              onClick={btnSubmitClicked}
            >
              Save
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

export default Racking;
