import { createSlice } from "@reduxjs/toolkit";

type tAddProduct = {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  galary: string[];
  SKU: string;
  stockQuantity: number;
  productsCode: string;
  lowStockWarning: number;
  isStockQuantityShow: boolean;
  isHideStock: boolean;
  regularPrice: number;
  discountPrice: number;
  attributes: [];
  isHotProduct: boolean;
  isFeaturedProduct: boolean;
  isFlashSalesProduct: boolean;
};

const initialState = {};

const addProductSlice = createSlice({
  name: "addProducts",
  initialState,
  reducers: {
    addProducts: (state, action) => {},
  },
});

export default addProductSlice.reducer;
