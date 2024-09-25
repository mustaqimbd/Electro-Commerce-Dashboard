import { createSlice } from "@reduxjs/toolkit";
import { TAllCoupons } from "./couponInterface";

const initialState: TAllCoupons = {
  selectedType: "active",
  isLoading: true,
  codes: [],
};

const couponSlice = createSlice({
  name: "allCoupons",
  initialState,
  reducers: {
    setCoupons: (state, { payload }) => {
      state.codes = payload;
    },
    setCouponSelectedType: (state, { payload }) => {
      state.selectedType = payload;
    },
    setCouponLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setCoupons, setCouponSelectedType, setCouponLoading } =
  couponSlice.actions;

export default couponSlice.reducer;
