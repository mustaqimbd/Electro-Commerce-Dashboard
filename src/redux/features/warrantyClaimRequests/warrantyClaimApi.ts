import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";
import searchParams from "@/utilities/searchParams";

const warrantyClaimReq = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWarrantyClaimRequests: builder.query({
      query: (args: Partial<TQuery>) => ({
        url: "/warranty-claim",
        params: searchParams(args),
      }),
      providesTags: ["warrantyClaimRequests"],
    }),
    updateWarrantyClamReqStatus: builder.mutation({
      query: (orderData) => ({
        url: "/warranty-claim/update-contact-status",
        method: "PATCH",
        body: orderData,
      }),
      invalidatesTags: ["warrantyClaimRequests"],
    }),
    updateWarrantyClamReq: builder.mutation({
      query: (orderData) => ({
        url: `/warranty-claim/update-request/${orderData.id}`,
        method: "PATCH",
        body: orderData,
      }),
      invalidatesTags: ["warrantyClaimRequests"],
    }),
    createWarrantyClamOrder: builder.mutation({
      query: (orderData) => ({
        url: `/warranty-claim/create-order/${orderData.id}`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["warrantyClaimRequests"],
    }),
  }),
});

export const {
  useGetWarrantyClaimRequestsQuery,
  useUpdateWarrantyClamReqStatusMutation,
  useUpdateWarrantyClamReqMutation,
  useCreateWarrantyClamOrderMutation,
} = warrantyClaimReq;
