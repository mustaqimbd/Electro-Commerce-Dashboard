"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import baseApi from "./baseApi/baseApi";
import courierBaseApi from "./baseApi/courierBaseApi";
import addProductReducer from "./features/addProduct/addProductSlice";
import variationReducer from "./features/addProduct/variation/variationSlice";
import authReducer from "./features/auth/authSlice";
import addCategoryReducer from "./features/category/addCategorySlice";
import orderReducer from "./features/order/OrderSlice";
import updateOrderReducer from "./features/order/updateOrderSlice";
import storage from "./storage";

const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [courierBaseApi.reducerPath]: courierBaseApi.reducer,
    auth: persistedAuthReducer,
    addProduct: addProductReducer,
    addCategory: addCategoryReducer,
    productVariation: variationReducer,
    order: orderReducer,
    updateOrder: updateOrderReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, courierBaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
persistStore(store);
