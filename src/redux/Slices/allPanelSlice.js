import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  panels: [],
  loading: false,
  error: "",
};

export const getAllPanels = createAsyncThunk("getallpanel", async () => {
  try {
    const res = await fetch(
      " https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/default/getPanels",
      {
        method: "get",
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

export const allPanelSlice = createSlice({
  name: "allPanel",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPanels.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPanels.fulfilled]: (state, payload) => {
      state.loading = false;
      if (payload == "server Error") {
        state.error = "Server Error, Try again Later!!!";
      } else {
        state.panels = payload.payload;
      }
    },
    [getAllPanels.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
  },
});

export default allPanelSlice.reducer;
