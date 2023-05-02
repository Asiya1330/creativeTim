import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  racking: {},
  loading: false,
  error: "",
  defaultRacking: {},
};

export const registerRacking = createAsyncThunk("registerracking", async (body) => {
  try {
    const res = await fetch(
      " https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/racking/addRacking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (res.status == 200) {
      return await res.json();
    } else {
      return "server Errror";
    }
  } catch (error) {
    return "server Error";
  }
});
export const getDefaultRacking = createAsyncThunk("getracking", async () => {
  try {
    const res = await fetch(
      " https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/default/getRacking",
      {
        method: "GET",
      }
    );
    if (res.status == 200) {
      return await res.json();
    } else {
      return "server Errror";
    }
  } catch (error) {
    return "server Error";
  }
});

export const rackingSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    setRackingRedux: (state, payload) => {
      state.racking = payload.payload;
    },
    setRackingToNull: (state) => {
      state.racking = {};
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: {
    [registerRacking.pending]: (state, action) => {
      state.loading = true;
    },
    [registerRacking.fulfilled]: (state, payload) => {
      state.loading = false;
      if (payload == "server Error") {
        state.error = "Server Error, Try again Later!!!";
      } else {
        state.racking = payload.payload;
      }
    },
    [registerRacking.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
    [getDefaultRacking.pending]: (state, action) => {
      state.loading = true;
    },
    [getDefaultRacking.fulfilled]: (state, payload) => {
      state.loading = false;
      if (payload == "server Error") {
        state.error = "Server Error, Try again Later!!!";
      } else {
        state.defaultRacking = payload.payload;
      }
    },
    [getDefaultRacking.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
  },
});
export const { setRackingRedux, setRackingToNull } = rackingSlice.actions;
export default rackingSlice.reducer;
