import { createSlice } from "@reduxjs/toolkit";
import { TMonitorOrdersInitialState } from "./monitorDeliveryInterface";

const initialState: TMonitorOrdersInitialState = {
  monitorDeliveryOrders: [],
  selectedStatus: "pending",
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

const monitorDeliverySlice = createSlice({
  name: "monitorDelivery",
  initialState,
  reducers: {
    setMonitorDeliveryOrders: (state, action) => {
      state.monitorDeliveryOrders = action.payload;
    },
    setSelectedStatus: (state, action) => {
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
  setMonitorDeliveryOrders,
  setSelectedStatus,
  setSingleOrder,
  setBulkOrder,
} = monitorDeliverySlice.actions;

export default monitorDeliverySlice.reducer;
