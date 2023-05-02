import { configureStore } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";
import allClientsReducer from "./Slices/allClientsSlice";
import clientReducer from "./Slices/clientSlice";
import allPanelReducer from "./Slices/allPanelSlice";
import panelReducer from "./Slices/panelSlice";
import rackingReducer from "./Slices/rackingSlice";
const store = configureStore({
  reducer: {
    clients: allClientsReducer,
    client: clientReducer,
    allPanel: allPanelReducer,
    panel: panelReducer,
    racking: rackingReducer,
  },
});

export default store;
