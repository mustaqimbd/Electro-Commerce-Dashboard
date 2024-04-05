import baseApi from "@/redux/baseApi/baseApi";
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
        body: payload,
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

const updateStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation({
      query: (payload: { orderIds: string[]; status: string }) => ({
        url: `/orders/update-status`,
        method: "PATCH",
        body: payload,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderIds: string[]) => ({
        url: `/orders/delete-many`,
        method: "DELETE",
        body: { orderIds },
      }),
    }),
  }),
});

export const { useUpdateOrderStatusMutation, useDeleteOrderMutation } =
  updateStatusApi;

export const {
  usePlaceSingleOrderMutation,
  usePlaceOrdersMutation,
  useCheckDeliveryStatusQuery,
} = orderApi;
