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

const ClientDefaults = () => {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (reduxData.client && reduxData.client.client && reduxData.client.client._id) {
      setValue("margin", reduxData.client.client.margin);
      setValue("labourCost", reduxData.client.client.labourCost);
      setValue("gst", reduxData.client.client.gst);
    }
  }, [reduxData.client]);

  const onSubmit = (data) => {
    dispatch(updateClient({ id: reduxData.client.client._id, body: data }));
  };
  return (
    <>
      {reduxData.client && reduxData.client.client && reduxData.client.client._id ? (
        <Card>
          <MDBox pt={2} pl={2} pr={2}>
            <MDTypography variant="h6">Default Constants</MDTypography>
          </MDBox>
          <MuiDivider></MuiDivider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MDBox pb={2} pl={2} pr={2}>
              <Grid container spacing={3}>
                <Grid item lg={3}>
                  <MDInput
                    type="text"
                    label="Margin in %"
                    autoComplete="off"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("margin")}
                  />
                </Grid>
                <Grid item lg={3}>
                  <MDInput
                    type="text"
                    label="Effective Labour cost/hr"
                    autoComplete="off"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("labourCost")}
                  />
                </Grid>
                <Grid item lg={3}>
                  <MDInput
                    type="text"
                    label="GST"
                    autoComplete="off"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("gst")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} direction="column" alignItems="center" justify="center">
                <Grid item lg={4}></Grid>
                <Grid item lg={4}>
                  <MDButton type="submit" variant="gradient" color="success" size="small">
                    Update Changes
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </form>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default ClientDefaults;
