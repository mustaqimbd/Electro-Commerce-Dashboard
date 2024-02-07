/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { TInitialState } from "./interface";

const initialState: TInitialState = {
  title: null,
  description: null,
  category: null,
  thumbnail: null,
  gallery: null,
  SKU: null,
  stockQuantity: null,
  productsCode: null,
  lowStockWarning: null,
  isStockQuantityShow: false,
  isHideStock: false,
  regularPrice: null,
  discountPrice: null,
  attributes: [],
  isHotProduct: false,
  isFeaturedProduct: false,
  isFlashSalesProduct: false,
};

const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    addProduct: (_state, action) => {},
  },
});

export const { addProduct } = addProductSlice.actions;
export default addProductSlice.reducer;
