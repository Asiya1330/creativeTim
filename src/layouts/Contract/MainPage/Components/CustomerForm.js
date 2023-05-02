import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components

import MDTypography from "components/MDTypography";
import { Card, Grid } from "@mui/material";

import MuiDivider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "components/MDInput";
import unitType from "../Data/unitType";
import streetType from "../Data/streetType";
import MDButton from "components/MDButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerClient } from "redux/Slices/clientSlice";
import { useState } from "react";
import { useEffect } from "react";
import { updateClient } from "redux/Slices/clientSlice";
const CustomerForm = (props) => {
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  const newForm =
    reduxData.client && reduxData.client.client && reduxData.client.client._id ? false : true;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (reduxData.client && reduxData.client.client && reduxData.client.client._id) {
      setValue("firstName", reduxData.client.client.firstName);
      setValue("lastName", reduxData.client.client.lastName);
      setValue("email", reduxData.client.client.email);
      setValue("phone", reduxData.client.client.phone);
      setValue("mobile", reduxData.client.client.mobile);
      setValue("address", reduxData.client.client.address);
      setValue("postalCode", reduxData.client.client.postalCode);
      setValue("latitude", reduxData.client.client.latitude);
      setValue("longitude", reduxData.client.client.longitude);
      setValue("distance", reduxData.client.client.distance);
      setValue("streetNumber", reduxData.client.client.streetNumber);
      setValue("streetName", reduxData.client.client.streetName);
      setValue("suburb", reduxData.client.client.suburb);
      setValue("state", reduxData.client.client.state);
    }
  }, [reduxData.client]);

  const onSubmit = (data) => {
    if (newForm) {
      dispatch(registerClient(data));
    } else {
      const data2 = {
        ...reduxData.client.client,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        address: data.address,
        postalCode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        distance: data.distance,
        streetNumber: data.streetNumber,
        streetName: data.streetName,
        suburb: data.suburb,
        state: data.state,
      };
      // console.log(data2);
      dispatch(updateClient({ id: reduxData.client.client._id, body: data2 }));
    }
  };
  return (
    <Card>
      <MDBox pt={2} pl={2} pr={2}>
        <MDTypography variant="h6">Customer Details</MDTypography>
      </MDBox>
      <MuiDivider></MuiDivider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MDBox pb={2} pl={2} pr={2}>
          <Grid container spacing={3}>
            <Grid item lg={3}>
              <MDInput
                type="text"
                label="First Name *"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("firstName")}
              />
            </Grid>
            <Grid item lg={3}>
              <MDInput
                type="text"
                label="last Name"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("lastName")}
              />
            </Grid>
            <Grid item lg={3}>
              <MDInput
                type="text"
                label="Email"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("email")}
              />
            </Grid>
            <Grid item lg={3}>
              <MDInput
                type="text"
                label="Phone *"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("phone")}
              />
            </Grid>
            <Grid item lg={3}>
              <MDInput
                type="text"
                label="Mobile"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("mobile")}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} pl={2} pr={2}>
          <MDTypography variant="h6">Address</MDTypography>
        </MDBox>
        <MuiDivider></MuiDivider>
        <MDBox pb={2} pl={2} pr={2}>
          <Grid container spacing={3}>
            <Grid item lg={4}>
              <MDInput
                type="text"
                label="Address *"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("address")}
              />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="Postal Code"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("postalCode")}
              />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="Latitude"
                inputProps={{ readOnly: true }}
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("latitude")}
              />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="Longitude"
                inputProps={{ readOnly: true }}
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("longitude")}
              />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="Distance"
                inputProps={{ readOnly: true }}
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("distance")}
              />
            </Grid>
            {/* <Grid item lg={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select"
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={"default"}
                sx={{ height: "2.7rem" }}
              >
                <MenuItem value={"default"}>Select A Unit type</MenuItem>;
                {unitType.map((type, key) => {
                  return (
                    <MenuItem key={key} value={type.value}>
                      {type.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid> */}
            <Grid item lg={2}>
              <MDInput type="number" label="Unit Number" autoComplete="off" fullWidth />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="number"
                label="Street Number"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("streetNumber")}
              />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="Street Name"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("streetName")}
              />
            </Grid>
            {/* <Grid item lg={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select"
                fullWidth
                InputLabelProps={{ shrink: true }}
                defaultValue={"default"}
                sx={{ height: "2.7rem" }}
              >
                <MenuItem value={"default"}>Select A Street type</MenuItem>;
                {streetType.map((type, key) => {
                  return (
                    <MenuItem key={key} value={type.value}>
                      {type.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid> */}
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="Suburb"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("suburb")}
              />
            </Grid>
            <Grid item lg={2}>
              <MDInput
                type="text"
                label="State"
                autoComplete="off"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("state")}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pb={2} pl={2} pr={2}>
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item lg={4}></Grid>
            <Grid item lg={4}>
              <MDButton type="submit" variant="gradient" color="success" size="medium">
                {newForm ? <>Save Customer</> : <>Update Customer</>}
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </Card>
  );
};

export default CustomerForm;
