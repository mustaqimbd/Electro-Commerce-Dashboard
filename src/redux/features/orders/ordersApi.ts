import baseApi from "@/redux/baseApi/baseApi";

const updateStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["carts"],
    }),
    getAllOrders: builder.query({
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
        url: `/orders/admin/all-orders?status=${status}&sort=${sort}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["allOrders"],
    }),
    updateOrdersStatus: builder.mutation({
      query: (payload: { orderIds: string[]; status: string }) => ({
        url: `/orders/update-status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["allOrders"],
    }),
    deleteOrders: builder.mutation({
      query: (orderIds: string[]) => ({
        url: `/orders/delete-many`,
        method: "DELETE",
        body: { orderIds },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrdersStatusMutation,
  useDeleteOrdersMutation,
} = updateStatusApi;
