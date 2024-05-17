import baseApi from "@/redux/baseApi/baseApi";

const updateOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderInfo: builder.mutation({
      query: (data) => ({
        url: `/orders/update-order/${data._id}`,
        method: "PATCH",
        body: {
          discount: data?.discount,
          shipping: {
            fullName: data?.shipping?.fullName,
            phoneNumber: data?.shipping?.phoneNumber,
            fullAddress: data?.shipping?.fullAddress,
          },
          officialNotes: data?.officialNotes,
          invoiceNotes: data?.invoiceNotes,
          courierNotes: data?.courierNotes,
          followUpDate: data?.followUpDate,
        },
      }),
      invalidatesTags: [
        "allOrders",
        "processingOrders",
        "processingDoneAndCourierOrders",
      ],
    }),
    updateOrderProductQuantity: builder.mutation({
      query: (data) => ({
        url: `/orders/update-quantity/${data.orderId}`,
        method: "PATCH",
        body: {
          orderedItemId: data?.orderedItemId,
          quantity: data?.newQuantity,
        },
      }),
    }),
  }),
});

export const {
  useUpdateOrderInfoMutation,
  useUpdateOrderProductQuantityMutation,
} = updateOrderApi;
