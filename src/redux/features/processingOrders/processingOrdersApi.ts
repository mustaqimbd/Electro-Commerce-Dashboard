import baseApi from "@/redux/baseApi/baseApi";

const processingOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProcessingOrders: builder.query({
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
        url: `/orders/admin/processing-orders?status=${status}&sort=${sort}&page=${page}&limit=${limit}`,
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
