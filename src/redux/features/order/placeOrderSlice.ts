import { createSlice } from "@reduxjs/toolkit";
import { TInitialState } from "./interface";

const initialState: TInitialState = {
  singleOrder: {
    invoice: "",
    recipient_name: "",
    recipient_phone: "",
    recipient_address: "",
    cod_amount: 0,
    note: "",
  },
  bulkOrders: [],
};

const placeOrderSlice = createSlice({
  name: "placeOrderSlice",
  initialState,
  reducers: {
    setSingleOrder: (state, action) => {
      state.singleOrder = action.payload;
    },
    setBulkOrder: (state, action) => {
      state.bulkOrders = action.payload;
    },
  },
});
export const { setSingleOrder, setBulkOrder } = placeOrderSlice.actions;

export default placeOrderSlice.reducer;
