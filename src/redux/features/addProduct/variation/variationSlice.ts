import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TVariation, TSelectedAttribute } from "./interface";
import { TInventory, TOffer, TPrice } from "../interface";

const initialState: TVariation = {
  selectedAttribute: [],
  selectedAttributeValue: {},
  price: {
    regularPrice: 0,
    salePrice: 0,
    discountPercent: 0,
    date: {
      start: "",
      end: "",
    },
  },
  image: {
    thumbnail: "",
    gallery: [],
  },
  inventory: {
    sku: "",
    stockStatus: "",
    stockQuantity: 0,
    productCode: "",
    lowStockWarning: 0,
    manageStock: false,
    showStockQuantity: false,
    showStockWithText: false,
    hideStock: false,
    soldIndividually: false,
  },
  offer: {
    flash: false,
    today: false,
    featured: false,
  },
};

const variationSlice = createSlice({
  name: "productVariation",
  initialState,
  reducers: {
    setSelectedAttribute: (
      state,
      action: PayloadAction<TSelectedAttribute[]>
    ) => {
      state.selectedAttribute = action.payload;
      const labelSet = new Set(action.payload.map((label) => label.label));
      state.selectedAttributeValue = Object.fromEntries(
        Object.entries(state.selectedAttributeValue).filter(([key]) =>
          labelSet.has(key)
        )
      );
    },
    setSelectedAttributeValue: (
      state,
      action: PayloadAction<TSelectedAttribute>
    ) => {
      const { label, child } = action.payload;
      state.selectedAttributeValue[label] = child;
    },
    setVariationThumbnail: (state, action: PayloadAction<string>) => {
      state.image.thumbnail = action.payload;
    },
    setVariationGallery: (state, action: PayloadAction<string[]>) => {
      state.image.gallery = [];
      state.image.gallery.push(...action.payload);
    },
    setVariationPrice: (state, action: PayloadAction<TPrice>) => {
      state.price = { ...action.payload };
    },
    setVariationInventory: (state, action: PayloadAction<TInventory>) => {
      state.inventory = { ...action.payload };
    },
    setVariationOffer: (state, action: PayloadAction<TOffer>) => {
      state.offer = { ...action.payload };
    },
  },
});

export const {
  setSelectedAttribute,
  setSelectedAttributeValue,
  setVariationThumbnail,
  setVariationGallery,
  setVariationPrice,
  setVariationInventory,
  setVariationOffer,
} = variationSlice.actions;

export default variationSlice.reducer;
