import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TInitialStateUpdateOrder, TProduct } from "./interface";

// Define the initial state
const initialState: TInitialStateUpdateOrder = {
  updateOrder: {
    product: {
      _id: "",
      quantity: 1,
      price: 0,
    },
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: { fullName: "", phoneNumber: "", fullAddress: "" },
    officialNotes: "",
    invoiceNotes: "",
    courierNotes: "",
  },
};

// Create a slice
const updateOrderSlice = createSlice({
  name: "updateOrderSlice",
  initialState,
  reducers: {
    // Action for setting shipping full name
    setShippingFullName: (state, action: PayloadAction<string>) => {
      state.updateOrder.shipping.fullName = action.payload;
    },

    // Action for setting shipping phone number
    setShippingPhoneNumber: (state, action: PayloadAction<string>) => {
      state.updateOrder.shipping.phoneNumber = action.payload;
    },

    // Action for setting shipping full address
    setShippingFullAddress: (state, action: PayloadAction<string>) => {
      state.updateOrder.shipping.fullAddress = action.payload;
    },
    // Action for setting Official Notes
    setOfficialNotes: (state, action: PayloadAction<string>) => {
      state.updateOrder.officialNotes = action.payload;
    },
    // Action for setting Courier Notes
    setInvoiceNotes: (state, action: PayloadAction<string>) => {
      state.updateOrder.invoiceNotes = action.payload;
    },
    // Action for setting Courier Notes
    setCourierNotes: (state, action: PayloadAction<string>) => {
      state.updateOrder.courierNotes = action.payload;
    },
    // Action for setting Courier Notes
    setDiscount: (state, action: PayloadAction<number>) => {
      state.updateOrder.discount = action.payload;
    },

    // Action for updating products
    updateProducts: (
      state,
      action: PayloadAction<{ product: TProduct; shippingCharge: number }>
    ) => {
      const { product, shippingCharge } = action.payload;

      // Update the product in the state
      state.updateOrder.product = product;

      // Calculate subtotal based on the updated product
      const subtotal = product.quantity * product.price;

      // Update subtotal in the state
      state.updateOrder.subtotal = subtotal;

      // Calculate total
      state.updateOrder.total = subtotal + shippingCharge;
    },

    // Action for updating product quantity

    // Action for resetting products
    resetProduct: () => {
      return initialState;
    },
  },
});

// Extract the actions
export const {
  setShippingFullName,
  setShippingPhoneNumber,
  setShippingFullAddress,
  setCourierNotes,
  setInvoiceNotes,
  setOfficialNotes,
  updateProducts,
  resetProduct,
} = updateOrderSlice.actions;

// Export the reducer
export default updateOrderSlice.reducer;
