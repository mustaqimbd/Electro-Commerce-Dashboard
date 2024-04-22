import { createSlice } from "@reduxjs/toolkit";
import { TInitialStatePlaceOrder } from "./interface";

const initialState: TInitialStatePlaceOrder = {
  orders: [],
  searchedOrders: [],
  orderFilterValue: "all",
  processingOrders: [],
  searchProcessingOrders: [],
  singleOrder: {
    invoice: "",
    recipient_name: "",
    recipient_phone: "",
    recipient_address: "",
    cod_amount: 0,
    note: "",
  },
  bulkOrders: {
    selectedOrders: [],
    orderIds: [],
    invoices: [],
  },
};

const placeOrderSlice = createSlice({
  name: "placeOrderSlice",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderFilterValue: (state, action) => {
      state.orderFilterValue = action.payload;
    },
    setSearchedOrders: (state, action) => {
      state.searchedOrders = action.payload;
    },
    setProcessingOrders: (state, action) => {
      state.processingOrders = action.payload;
    },
    setSearchProcessingOrders: (state, action) => {
      state.searchProcessingOrders = action.payload;
    },
    setSingleOrder: (state, action) => {
      state.singleOrder = action.payload;
    },
    setBulkOrder: (state, action) => {
      state.bulkOrders = action.payload;
    },
  },
});
export const {
  setOrders,
  setOrderFilterValue,
  setSearchedOrders,
  setProcessingOrders,
  setSearchProcessingOrders,
  setSingleOrder,
  setBulkOrder,
} = placeOrderSlice.actions;

export default placeOrderSlice.reducer;
