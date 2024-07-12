import baseApi from "@/redux/baseApi/baseApi";

const shippingChargeAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShippingCharge: builder.query({
      query: () => ({
        url: "/shipping-charges",
        method: "GET",
      }),
      // transformResponse: (response:unknown) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
      providesTags: ["shippingCharge"],
    }),
  }),
});

export const { useGetShippingChargeQuery } = shippingChargeAPI;
