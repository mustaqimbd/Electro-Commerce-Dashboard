import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";
import searchParams from "@/utilities/searchParams";

const updateStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonitorDeliveryOrders: builder.query({
      query: (args: TQuery) => ({
        url: "/orders/admin/order-deliver-status",
        params: searchParams(args),
      }),
      providesTags: ["monitorDelivery"],
    }),
    refreshCourierOrders: builder.mutation({
      query: () => ({
        url: "/orders/update-order-delivery-status",
        method: "POST",
      }),
      invalidatesTags: ["monitorDelivery"],
    }),
  }),
});

export const {
  useGetMonitorDeliveryOrdersQuery,
  useRefreshCourierOrdersMutation,
} = updateStatusApi;
