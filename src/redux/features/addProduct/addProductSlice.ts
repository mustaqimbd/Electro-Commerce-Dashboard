import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TAttribute,
  TInventory,
  TPrice,
  TProduct,
  TPublishedStatus,
  TSeoData,
} from "./interface";

const initialState: TProduct = {
  title: "",
  permalink: "",
  slug: "",
  type: "simple",
  description: "",
  shortDescription: "",
  featured: false,
  downloadable: false,
  review: true,
  price: {
    regularPrice: 0,
    salePrice: 0,
    discount: 0,
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
  attribute: [],
  brand: [],
  category: {
    _id: "",
    subcategories: [],
  },
  tag: [],
  seoData: {
    focusKeyphrase: "",
    metaTitle: "",
    slug: "",
    metaDescription: "",
  },
  publishedStatus: {
    status: "Published",
    visibility: "Public",
    date: "",
  },
};

const productSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setThumbnail: (state, action: PayloadAction<string>) => {
      state.image.thumbnail = action.payload;
    },
    setGallery: (state, action: PayloadAction<string[]>) => {
      state.image.gallery = [];
      state.image.gallery.push(...action.payload);
    },
    setAttribute: (state, action: PayloadAction<TAttribute[]>) => {
      state.attribute = action.payload;
    },
    setPrice: (state, action: PayloadAction<TPrice>) => {
      state.price = action.payload;
    },
    setInventory: (state, action: PayloadAction<TInventory>) => {
      state.inventory = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category._id = action.payload;
    },
    setSubcategory: (state, action: PayloadAction<string[]>) => {
      state.category.subcategories = [];
      state.category.subcategories.push(...action.payload);
    },
    setBrand: (state, action: PayloadAction<string[]>) => {
      state.brand = action.payload;
    },
    setTag: (state, action: PayloadAction<string[]>) => {
      state.tag = action.payload;
    },
    setSeoData: (state, action: PayloadAction<TSeoData>) => {
      state.seoData = action.payload;
    },
    setPublishedStatus: (state, action: PayloadAction<TPublishedStatus>) => {
      state.publishedStatus = action.payload;
    },
    setProduct: (state, action: PayloadAction<TProduct>) => {
      return action.payload;
    },
    resetProduct: () => {
      return initialState;
    },
  },
});

export const {
  setTitle,
  setDescription,
  setThumbnail,
  setGallery,
  setAttribute,
  setPrice,
  setInventory,
  setCategory,
  setSubcategory,
  setBrand,
  setTag,
  setSeoData,
  setPublishedStatus,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
// setProduct: (state, action: PayloadAction<TProduct>) => {
//   const {
//     title,
//     permalink,
//     slug,
//     type,
//     description,
//     shortDescription,
//     featured,
//     downloadable,
// review,
// price,
// image,
// inventory,
// attribute,
// brand,
// category,
// tag,
// seoData,
// publishedStatus
//   } = action.payload;

//   state.title = title;
//   state.permalink = permalink;
//   state.slug = slug;
//   state.type = type;
//   state.description = description;
//   state.shortDescription = shortDescription;
//   state.featured = featured;
//   state.downloadable = downloadable;
// state.review = review;
// state.price = price;
// state.image = image;
// state.inventory = inventory;
// state.attribute = attribute;
// state.brand = brand;
// state.category = category;
// state.tag = tag;
// state.seoData = seoData;
// state.publishedStatus = publishedStatus;
// }
