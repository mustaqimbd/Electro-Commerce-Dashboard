import { createSlice } from "@reduxjs/toolkit";
import { TOrdersInitialState } from "./ordersInterface";

const initialState: TOrdersInitialState = {
  orders: [],
  selectedStatus: "all",
  iSOrderUpdate: false,
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

const ordersSlice = createSlice({
  name: "placeOrderSlice",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setSelectedStatus: (state, action) => {
      // state.search = false
      // state.searchQuery = "";
      // state.searchedOrders = [];
      state.selectedStatus = action.payload;
    },
    setIsOrderUpdate: (state, action) => {
      state.iSOrderUpdate = action.payload;
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
  setSelectedStatus,
  setIsOrderUpdate,
  setSingleOrder,
  setBulkOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
