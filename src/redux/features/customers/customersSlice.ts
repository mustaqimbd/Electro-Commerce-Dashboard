import { createSlice } from "@reduxjs/toolkit";
import { TCustomersInitialState } from "./customersInterface";

const initialState: TCustomersInitialState = {
  customers: [],
  selectedStatus: "completed",
  iSOrderUpdate: false,
  bulkOrders: {
    orderIds: [],
    invoices: [],
  },
};

const customersSlice = createSlice({
  name: "customersSlice",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
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
    setBulkOrder: (state, action) => {
      state.bulkOrders = action.payload;
    },
  },
});
export const {
  setCustomers,
  setSelectedStatus,
  // setIsOrderUpdate,
  setBulkOrder,
} = customersSlice.actions;

export default customersSlice.reducer;
