import baseApi from "@/redux/baseApi/baseApi";

const WarrantySlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddWarrantyCode: builder.mutation({
      query: (payload) => ({
        url: `/warranty`,
        method: "POST",
        body: payload,
      }),
    }),
    updateWarrantyCode: builder.mutation({
      query: (payload) => ({
        url: `/warranty`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useAddWarrantyCodeMutation, useUpdateWarrantyCodeMutation } =
  WarrantySlice;
