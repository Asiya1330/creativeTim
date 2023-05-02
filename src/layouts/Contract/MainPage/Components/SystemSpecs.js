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
import panelBrand from "../Data/solarData/panelBrand";
import { useEffect } from "react";
import { useAsyncDebounce } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllPanels } from "redux/Slices/allPanelSlice";
import { setPanel } from "redux/Slices/panelSlice";
import MDButton from "components/MDButton";
import { registerPanel } from "redux/Slices/panelSlice";
import { useForm } from "react-hook-form";

const SystemSpecs = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  // const [noOfPanels, setNoOfPanels] = useState(0);
  const reduxData = useSelector((state) => state);
  // console.log(reduxData);
  const [editPanerlBrand, setEditPanerlBrand] = useState(false);
  const [editPanerlModel, setEditPanerlModel] = useState(false);
  const allPanels =
    reduxData.allPanel && reduxData.allPanel.panels ? reduxData.allPanel.panels : [];
  // console.log(allPanels);
  const [panelBrandName, setPanelBrandName] = useState("d");

  // useEffect(() => {
  //   if (modelName === "d" && allPanels.length > 0 && panelBrandName!=="d") {
  //     setModelName(reduxData.panel.panel.value);
  //   }
  // }, [reduxData.allPanel]);

  const newPanel =
    reduxData.panel && reduxData.panel.panel && reduxData.panel.panel.panelBrandName ? false : true;

  const [modelOptions, setModelOptions] = useState([]);
  const [modelName, setModelName] = useState("d");
  const [systemSize, setSystemSize] = useState(0);
  // console.log(systemSize);
  const [noOfPanels, setNoOfPanels] = useState(0);
  const [pricePerPanel, setPricePerPanel] = useState(0);

  useEffect(() => {
    if (allPanels.length > 0) {
      const selectedBrand = allPanels.find((brand) => brand.value === panelBrandName);
      if (selectedBrand) {
        setModelOptions(selectedBrand.models);
        if (
          !editPanerlBrand &&
          reduxData.panel &&
          reduxData.panel.panel &&
          reduxData.panel.panel.partNumber
        ) {
          setModelName(reduxData.panel.panel.partNumber);
        }
      } else {
        setModelOptions([]);
      }
    }
  }, [panelBrandName]);
  // console.log(modelName, panelBrandName);

  // console.log(modelOptions);
  useEffect(() => {
    // console.log(reduxData.panel);

    if (editPanerlModel) {
      const selectedBrand = allPanels.find((brand) => brand.value === panelBrandName);
      // console.log(selectedBrand, panelBrandName);
      const panelBrand = selectedBrand && selectedBrand.panelName ? selectedBrand.panelName : "";
      // console.log(panelBrand, modelName);
      if (
        modelName !== "d" &&
        selectedBrand &&
        selectedBrand.models &&
        selectedBrand.models.length > 0
      ) {
        // console.log("modelInfo, modelName");
        const modelInfo = selectedBrand.models.find((brand) => brand.partNumber === modelName);
        // console.log(modelInfo, modelName);
        const panelModelName = modelInfo.modelName;
        const panelPrice = modelInfo.price;
        const value = panelBrandName;
        const panelCapacity = modelInfo.capacity;
        const partNumber = modelInfo.partNumber;
        const pricePerWatt = modelInfo.price;
        const panelNumberReq = Math.round((systemSize * 1000) / panelCapacity);
        const systemKw = (panelNumberReq * panelCapacity) / 1000;
        setSystemSize(systemKw);
        setNoOfPanels(panelNumberReq);
        // const systemKw =
        const freightPerKw = modelInfo.freightPerKw;
        const freightHrPerKw = modelInfo.freightHrPerKw;
        const installHrPerPanel = modelInfo.installHrPerPanel;
        const totalPriceMaterial =
          systemKw * pricePerWatt +
          (systemKw * pricePerWatt * reduxData.client.client.margin) / 100;
        const numberOfPanles = (systemKw / panelCapacity) * 1000;
        const totalPriceLabour =
          numberOfPanles * installHrPerPanel * reduxData.client.client.labourCost;
        const totalFreight =
          freightPerKw * systemKw * (1 + reduxData.client.client.margin / 100) +
          freightHrPerKw * reduxData.client.client.labourCost * systemKw;
        const totalCost = totalFreight + totalPriceLabour + totalPriceMaterial;
        dispatch(
          setPanel({
            panelModelName,
            panelPrice,
            panelBrand,
            panelCapacity,
            partNumber,
            value,
            pricePerWatt,
            systemKw,
            freightHrPerKw,
            freightPerKw,
            installHrPerPanel,
            totalCost,
          })
        );
      }
    } else {
      // console.log(reduxData.panel.panel.panelCapacity);
      const panelCapacity = reduxData.panel.panel.panelCapacity;
      const panelNumberReq = Math.round((systemSize * 1000) / panelCapacity);
      const systemKw = (panelNumberReq * panelCapacity) / 1000;
      setSystemSize(systemKw ? systemKw : 0);
      setNoOfPanels(panelNumberReq ? panelNumberReq : 0);
      // const systemKw =
    }
  }, [modelName]);

  const modelChangeHandler = (e) => {
    setModelName(e.target.value);
    setEditPanerlModel(true);
  };

  useEffect(() => {
    if (allPanels.length == 0) {
      dispatch(getAllPanels());
    }
  }, [systemSize]);

  // useEffect(() => {
  //   if (allPanels.length == 0) {
  //     dispatch(getAllPanels());
  //   }
  // }, [allPanels.panel]);
  const btnSubmitClicked = () => {
    // console.log("data");
    if (noOfPanels > 0 && systemSize > 0 && modelName !== "d") {
      const data = {
        ...reduxData.panel.panel,
        clientId: reduxData.client.client._id,
      };
      // console.log(data);
      dispatch(registerPanel(data));
    }
  };

  useEffect(() => {
    // console.log(allPanels);
    if (
      allPanels &&
      allPanels.length &&
      allPanels.length > 0 &&
      reduxData.panel &&
      reduxData.panel.panel &&
      reduxData.panel.panel.panelModelName
    ) {
      // console.log(reduxData.panel.panel.value);
      // console.log("reduxData.panel.panel.value");
      setPanelBrandName(reduxData.panel.panel.value);
    }
  }, [reduxData.allPanel, reduxData.panel]);

  useEffect(() => {
    if (reduxData.panel && reduxData.panel.panel && reduxData.panel.panel.panelModelName) {
      setSystemSize(reduxData.panel.panel.systemKw);
    }
  }, [reduxData.panel]);
  const onSubmit = (data) => {
    // console.log("data");
    // console.log(data);
  };
  return (
    <Card>
      <MDBox pt={2} pl={2} pr={2}>
        <MDTypography variant="h6">System Specification</MDTypography>
      </MDBox>
      <MuiDivider></MuiDivider>

      <MDBox pb={2} pl={2} pr={2}>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <MDInput
              type="text"
              label="System Size (KW) *"
              autoComplete="off"
              fullWidth
              value={systemSize}
              onChange={(e) => {
                setSystemSize(e.target.value);
                setModelName("d");
                setPanelBrandName("d");
                setNoOfPanels(0);
              }}
            />
          </Grid>
          <Grid item lg={3}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select"
              fullWidth
              value={panelBrandName}
              sx={{ height: "2.7rem" }}
              InputLabelProps={{ shrink: true }}
              {...register("panelBrandName")}
              onChange={(e) => {
                setEditPanerlBrand(true);
                setModelName("d");
                setPanelBrandName(e.target.value);
              }}
            >
              <MenuItem value={"d"}>Select A Panel Brand</MenuItem>;
              {allPanels.map((type, key) => {
                return (
                  <MenuItem key={key} value={type.value}>
                    {type.panelName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item lg={3}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select"
              fullWidth
              value={modelName}
              sx={{ height: "2.7rem" }}
              onChange={modelChangeHandler}
            >
              <MenuItem value={"d"}>Select A Model</MenuItem>;
              {modelOptions.map((type, key) => {
                return (
                  <MenuItem key={key} value={type.partNumber}>
                    {type.modelName}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item lg={3}>
            <MDInput
              type="text"
              label="No of Panels"
              inputProps={{ readOnly: true }}
              autoComplete="off"
              value={noOfPanels}
              fullWidth
            />
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
              {newPanel ? <>Save Specs</> : <>Update Specs</>}
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

export default SystemSpecs;
