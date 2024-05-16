import baseApi from "@/redux/baseApi/baseApi";

const updateStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendCourierAndUpdateStatus: builder.mutation({
      query: (payload: { orderIds: string[]; status: string }) => ({
        url: `/orders/book-courier-and-update-status`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useSendCourierAndUpdateStatusMutation } = updateStatusApi;
