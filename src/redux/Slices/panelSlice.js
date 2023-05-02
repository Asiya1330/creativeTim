import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  panel: {},
  loading: false,
  error: "",
};

export const registerPanel = createAsyncThunk("registerpanel", async (body) => {
  try {
    const res = await fetch(
      " https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/panel/addPanel",
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

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    setPanel: (state, payload) => {
      state.panel = payload.payload;
    },
    setPanelToNull: (state) => {
      state.panel = {};
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: {
    [registerPanel.pending]: (state, action) => {
      state.loading = true;
    },
    [registerPanel.fulfilled]: (state, payload) => {
      state.loading = false;
      if (payload == "server Error") {
        state.error = "Server Error, Try again Later!!!";
      } else {
        state.panel = payload.payload;
      }
    },
    [registerPanel.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
  },
});
export const { setPanel, setPanelToNull } = panelSlice.actions;
export default panelSlice.reducer;
