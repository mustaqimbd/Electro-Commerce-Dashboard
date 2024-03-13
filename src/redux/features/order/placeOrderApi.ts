import courierBaseApi from "@/redux/baseApi/courierBaseApi";
import { TPlaceOrder, TUpdatePayload } from "./interface";
import baseApi from "@/redux/baseApi/baseApi";

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
    updateStatus: builder.mutation({
      query: ({ id, status }: TUpdatePayload) => ({
        url: `/orders/update-status/${id}`,
        method: "PATCH",
        body: status,
      }),
    }),
  }),
});

export const { useUpdateStatusMutation } = updateStatusApi;

export const {
  usePlaceSingleOrderMutation,
  usePlaceOrdersMutation,
  useCheckDeliveryStatusQuery,
} = orderApi;
