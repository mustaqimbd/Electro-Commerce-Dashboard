import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";

const processingOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProcessingOrders: builder.query({
      query: ({ status, startFrom, endAt, sort, page, limit }: TQuery) => ({
        url: `/orders/admin/processing-orders?status=${status}&startFrom=${startFrom}&endAt=${endAt}&sort=${sort}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["processingOrders"],
    }),
    updateProcessingOrderStatus: builder.mutation({
      query: (payload: { orderIds: string[]; status: string }) => ({
        url: `/orders/update-processing-status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["processingOrders"],
    }),
  }),
});

export const {
  useGetProcessingOrdersQuery,
  useUpdateProcessingOrderStatusMutation,
} = processingOrdersApi;
