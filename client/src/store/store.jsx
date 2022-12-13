import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
  },
});
