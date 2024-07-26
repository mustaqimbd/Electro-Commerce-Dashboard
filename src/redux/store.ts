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
import storage from "./storage";
import baseApi from "./baseApi/baseApi";
import courierBaseApi from "./baseApi/courierBaseApi";
import addProductReducer from "./features/addProduct/addProductSlice";
import variationReducer from "./features/addProduct/variation/variationSlice";
import authReducer from "./features/auth/authSlice";
import courierManagementReducer from "./features/courierManagement/courierManagementSlice";
import ordersReducer from "./features/orders/ordersSlice";
import paginationReducer from "./features/pagination/PaginationSlice";
import processingOrdersReducer from "./features/processingOrders/processingOrdersSlice";
import searchReducer from "./features/search/searchSlice";
import userSlice from "./features/user/userSlice";
import warrantyClaimSlice from "./features/warrantyClaimRequests/warrantyClaimSlice";
import allProductReducer from "./features/allProducts/allProductsSlice";
import imageSelectorReducer from "./features/imageSelector/imageSelectorSlice";

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
    productVariation: variationReducer,
    allProducts: allProductReducer,
    imageSelector: imageSelectorReducer,
    orders: ordersReducer,
    processingOrders: processingOrdersReducer,
    courierManagement: courierManagementReducer,
    search: searchReducer,
    pagination: paginationReducer,
    warrantyClaim: warrantyClaimSlice,
    users: userSlice,
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
