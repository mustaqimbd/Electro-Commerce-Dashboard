import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSelectedAttribute, TVariationInitialState } from "./interface";
import { TInventory, TOffer, TPrice } from "../interface";

// const variations: TVariation = {
//   attributes: {},
//   image: "",
//   price: {
//     regularPrice: 0,
//     salePrice: 0,
//     discountPercent: 0,
//     date: {
//       start: "",
//       end: "",
//     },
//   },
//   inventory: {
//     sku: "",
//     stockStatus: "",
//     stockQuantity: 0,
//     productCode: "",
//     lowStockWarning: 0,
//     manageStock: false,
//     showStockQuantity: false,
//     showStockWithText: false,
//     hideStock: false,
//     soldIndividually: false,
//   },
//   offer: {
//     flash: false,
//     today: false,
//     featured: false,
//   },
// };

const initialState: TVariationInitialState = {
  selectedAttribute: [],
  selectedAttributeValue: {},
  variations: [],
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
    setVariationAttributes: (
      state,
      action: PayloadAction<{ index: number; item: { [key: string]: string } }>
    ) => {
      const { index, item } = action.payload;
      if (state.variations[index]) {
        state.variations[index].attributes = item;
      } else {
        // If variations[index] does not exist, push a new object with attributes
        state.variations.push({
          attributes: item,
          image: "",
          price: {
            regularPrice: 0,
            salePrice: 0,
            discountPercent: 0,
            date: {
              start: "",
              end: "",
            },
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
        });
      }
    },
    setVariationThumbnail: (
      state,
      action: PayloadAction<{ index: number; image: string }>
    ) => {
      const { index, image } = action.payload;
      state.variations[index].image = image;
    },
    setVariationPrice: (state, action: PayloadAction<TPrice>) => {
      state.variations[action.payload.index || 0].price = { ...action.payload };
    },
    setVariationInventory: (state, action: PayloadAction<TInventory>) => {
      state.variations[action.payload.index || 0].inventory = {
        ...action.payload,
      };
    },
    setVariationOffer: (state, action: PayloadAction<TOffer>) => {
      state.variations[action.payload.index || 0].offer = { ...action.payload };
    },
  },
});

export const {
  setSelectedAttribute,
  setSelectedAttributeValue,
  setVariationAttributes,
  setVariationThumbnail,
  // setVariationGallery,
  setVariationPrice,
  setVariationInventory,
  setVariationOffer,
} = variationSlice.actions;

export default variationSlice.reducer;
