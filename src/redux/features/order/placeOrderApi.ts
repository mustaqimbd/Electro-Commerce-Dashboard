import courierBaseApi from "@/redux/baseApi/courierBaseApi";
import { TPlaceOrder } from "./interface";

const orderApi = courierBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeSingleOrder: builder.mutation({
      query: (payload: TPlaceOrder) => ({
        url: `/create_order`,
        method: "POST",
        body: payload,
      }),
    }),
    placeOrders: builder.mutation({
      query: (payload: TPlaceOrder[]) => ({
        url: `/create_order/bulk-order`,
        method: "POST",
        body: { data: payload },
      }),
    }),
    checkDeliveryStatus: builder.query({
      query: (invoiceId: string) => ({
        url: `/status_by_invoice/${invoiceId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePlaceSingleOrderMutation,
  usePlaceOrdersMutation,
  useCheckDeliveryStatusQuery,
} = orderApi;
