import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminInfo: Cookies.get('adminInfo') ? JSON.parse(Cookies.get('adminInfo')) : null
  },
  reducers: {
    adminDataStore: (state, action) => {
      state.adminInfo = action.payload;
      Cookies.set("adminInfo", JSON.stringify(state.adminInfo));
    },
    logOut: (state) => {
        state.adminInfo = null;
        Cookies.remove("adminInfo");
      }
  }
});

export const { adminDataStore, logOut } = adminSlice.actions;

export default adminSlice.reducer;
