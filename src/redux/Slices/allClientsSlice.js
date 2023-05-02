import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  loading: false,
  error: "",
};

export const getAllClient = createAsyncThunk("getallclient", async () => {
  try {
    const res = await fetch(
      " https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/client/getClient",
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

export const allClientsSlice = createSlice({
  name: "allClients",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllClient.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllClient.fulfilled]: (state, payload) => {
      state.loading = false;
      if (payload == "server Error") {
        state.error = "Server Error, Try again Later!!!";
      } else {
        state.users = payload.payload;
      }
    },
    [getAllClient.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
  },
});

export default allClientsSlice.reducer;
// .addCase(deleteUserProfile.pending, (state) => {
//   state.loading = true;
// })
// .addCase(deleteUserProfile.fulfilled, (state) => {
//   state.loading = false;
//   state.userProfile = null;
// })
// .addCase(deleteUserProfile.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// });
