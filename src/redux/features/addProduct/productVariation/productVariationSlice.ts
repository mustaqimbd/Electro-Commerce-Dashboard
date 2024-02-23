import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TSelectAttributeData,
  TSelectedAttribute,
  TSelectedAttributeValue,
} from "./interface";

const initialState: TSelectAttributeData = {
  selectedAttribute: [],
  selectedAttributeValue: {},
};

const productVariationSlice = createSlice({
  name: "productVariation",
  initialState,
  reducers: {
    setSelectedAttribute: (
      state,
      action: PayloadAction<TSelectedAttribute[]>
    ) => {
      state.selectedAttribute = action.payload;
    },
    setSelectedAttributeValue: (
      state,
      action: PayloadAction<TSelectedAttributeValue>
    ) => {
      const { name, value } = action.payload;
      console.log(action.payload);
      state.selectedAttributeValue[name] = value;
    },
  },
});

export const { setSelectedAttribute, setSelectedAttributeValue } =
  productVariationSlice.actions;

export default productVariationSlice.reducer;
