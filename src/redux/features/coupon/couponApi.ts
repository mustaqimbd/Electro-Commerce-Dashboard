import baseApi from "@/redux/baseApi/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (body) => ({
        url: `/coupons`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCouponMutation } = couponApi;
