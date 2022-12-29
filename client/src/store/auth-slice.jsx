import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  tokenExpiration: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.token = payload.payload.token;
      state.userId = payload.payload.userId;
      state.isLoggedIn = true;
      const tokenExpirationDate =
        payload.payload.expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60);
      state.tokenExpiration = tokenExpirationDate;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: state.userId,
          token: state.token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.tokenExpiration = null;
      state.userId = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
