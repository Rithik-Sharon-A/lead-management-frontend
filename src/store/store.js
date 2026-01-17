import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./leadsSlice.js";

export const store = configureStore({
  reducer: {
    leads: leadsReducer
  }
});
