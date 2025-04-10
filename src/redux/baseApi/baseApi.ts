import config from "@/config/config";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.base_url}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQueryWithRefreshToken: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // request for getting access token
    const res = await fetch(`${config.base_url}/api/v1/auth/access-token`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user: user, token: data.data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

type Tags =
  | "allProducts"
  | "singleProduct"
  | "allCustomerProducts"
  | "allOrders"
  | "processingOrders"
  | "processingDoneAndCourierOrders"
  | "monitorDelivery"
  | "carts"
  | "shippingCharge"
  | "paymentMethod"
  | "images"
  | "warrantyClaimRequests"
  | "users"
  | "customers"
  | "coupons"
  | "imageToOrderReq"
  | "registeredCustomers";
const tags: Tags[] = [
  "allProducts",
  "singleProduct",
  "allCustomerProducts",
  "allOrders",
  "processingOrders",
  "processingDoneAndCourierOrders",
  "monitorDelivery",
  "carts",
  "shippingCharge",
  "paymentMethod",
  "images",
  "warrantyClaimRequests",
  "users",
  "customers",
  "coupons",
  "imageToOrderReq",
  "customers",
  "registeredCustomers",
];

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQueryWithRefreshToken,
  tagTypes: tags,
  endpoints: () => ({}),
});

export default baseApi;
