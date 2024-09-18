import baseApi from "@/redux/baseApi/baseApi";

const shippingChargeAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShippingCharge: builder.mutation({
      query: (body) => ({
        url: "/shipping-charges",
        method: "POST",
        body,
      }),
      invalidatesTags: ["shippingCharge"],
    }),
    getShippingCharge: builder.query({
      query: () => ({
        url: "/shipping-charges",
        method: "GET",
      }),
      providesTags: ["shippingCharge"],
    }),
  }),
});

export const { useGetShippingChargeQuery, useCreateShippingChargeMutation } =
  shippingChargeAPI;
