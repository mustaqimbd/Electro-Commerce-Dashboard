import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";

const warrantyClaimReq = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWarrantyClaimRequests: builder.query({
      query: ({
        status,
        startFrom,
        endAt,
        sort,
        page,
        limit,
      }: Partial<TQuery>) => ({
        url: `/warranty-claim?status=${status}&startFrom=${startFrom}&endAt=${endAt}&sort=${sort}&page=${page}&limit=${limit}`,
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
