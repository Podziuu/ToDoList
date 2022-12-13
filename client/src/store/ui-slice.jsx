import { createSlice } from "@reduxjs/toolkit";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const initialState = {
  day: DAYS[new Date().getDay()],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeDay: (state, payload) => {
      state.day = payload.payload.day;
    },
  },
});

export const { changeDay } = uiSlice.actions;

export default uiSlice.reducer;
