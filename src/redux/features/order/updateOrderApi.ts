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
        },
      }),
    }),
    updateOrderProductQuantity: builder.mutation({
      query: (data) => ({
        url: `/orders/update-quantity/${data._id}`,
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
