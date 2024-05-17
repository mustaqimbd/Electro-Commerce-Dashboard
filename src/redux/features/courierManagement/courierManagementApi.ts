import baseApi from "@/redux/baseApi/baseApi";

const updateStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProcessingDoneAndCourierOrders: builder.query({
      query: ({
        status,
        sort,
        page,
        limit,
      }: {
        status: string;
        sort: string;
        page: number;
        limit: number;
      }) => ({
        url: `/orders/admin/processing-done-on-courier-orders?status=${status}&sort=${sort}&page=${page}&limit=${limit}`,
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
