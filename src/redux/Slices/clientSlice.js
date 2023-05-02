import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  client: {},
  loading: false,
  error: "",
};

export const registerClient = createAsyncThunk("registerclient", async (body) => {
  try {
    const res = await fetch(
      " https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/client/register",
      {
        method: "post",
        body: JSON.stringify(body),
      }
    );
    if (res.status == 200) {
      return await res.json();
    } else {
      return "server Error";
    }
  } catch (error) {
    return "server Error";
  }
});
export const getClient = createAsyncThunk("fetchclient", async ({ id }) => {
  try {
    const res = await fetch(
      `https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/client/fetchClient/${id}`,
      {
        method: "get",
      }
    );
    if (res.status == 200) {
      return await res.json();
    } else {
      return "server Error";
    }
  } catch (error) {
    return "server Error";
  }
});
export const updateClient = createAsyncThunk("updateclient", async ({ id, body }) => {
  try {
    const res = await fetch(
      `https://d7r04i0s2k.execute-api.ap-southeast-2.amazonaws.com/client/update/${id}`,
      {
        method: "put",
        body: JSON.stringify(body),
      }
    );
    if (res.status == 200) {
      return await res.json();
    } else {
      return "server Error";
    }
  } catch (error) {
    return "server Error";
  }
});

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientToNull: (state) => {
      state.client = {};
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: {
    [registerClient.pending]: (state, action) => {
      state.loading = true;
    },
    [registerClient.fulfilled]: (state, payload) => {
      state.loading = false;
      state.client = payload.payload;
    },
    [registerClient.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
    [getClient.pending]: (state, action) => {
      state.loading = true;
    },
    [getClient.fulfilled]: (state, payload) => {
      state.loading = false;
      // console.log(payload);
      state.client = payload.payload;
    },
    [getClient.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
    [updateClient.pending]: (state, action) => {
      state.loading = true;
    },
    [updateClient.fulfilled]: (state, payload) => {
      state.loading = false;
      // console.log(payload);
      state.client = payload.payload;
    },
    [updateClient.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Server Error, Try again Later!!!";
    },
  },
});
export const { setClientToNull } = clientSlice.actions;
export default clientSlice.reducer;
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
