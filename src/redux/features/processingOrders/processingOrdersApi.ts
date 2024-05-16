import baseApi from "@/redux/baseApi/baseApi";

const processingOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProcessingOrderStatus: builder.mutation({
      query: (payload: { orderIds: string[]; status: string }) => ({
        url: `/orders/update-processing-status`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useUpdateProcessingOrderStatusMutation } = processingOrdersApi;
