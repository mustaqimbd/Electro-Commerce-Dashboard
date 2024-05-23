import baseApi from "@/redux/baseApi/baseApi";
import { TOrderQuery } from "@/types/order/order.interface";

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
        startFrom,
        endAt,
        sort,
        page,
        limit,
      }: TOrderQuery) => ({
        url: `/orders/admin/all-orders?status=${status}&startFrom=${startFrom}&endAt=${endAt}&sort=${sort}&page=${page}&limit=${limit}`,
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
