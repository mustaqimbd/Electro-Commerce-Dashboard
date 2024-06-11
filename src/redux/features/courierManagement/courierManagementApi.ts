import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";

const updateStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProcessingDoneAndCourierOrders: builder.query({
      query: ({ status, startFrom, endAt, sort, page, limit }: TQuery) => ({
        url: `/orders/admin/processing-done-on-courier-orders?status=${status}&startFrom=${startFrom}&endAt=${endAt}&sort=${sort}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["processingDoneAndCourierOrders"],
    }),
    sendCourierAndUpdateStatus: builder.mutation({
      query: (payload: { orderIds: string[]; status: string }) => ({
        url: `/orders/book-courier-and-update-status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["processingDoneAndCourierOrders"],
    }),
  }),
});

export const {
  useGetProcessingDoneAndCourierOrdersQuery,
  useSendCourierAndUpdateStatusMutation,
} = updateStatusApi;
