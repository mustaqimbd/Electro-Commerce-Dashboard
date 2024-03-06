import baseApi from "@/redux/baseApi/baseApi";

const attributesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAttribute: builder.mutation({
      query: (categoryIds) => ({
        url: `/categories`,
        method: "DELETE",
        body: {
          categoryIds,
        },
      }),
    }),
    addAttribute: builder.mutation({
      query: (attributeName) => ({
        url: `/attributes`,
        method: "POST",
        body: {
          name: attributeName,
          values: [""],
        },
      }),
    }),
  }),
});

export const { useDeleteAttributeMutation, useAddAttributeMutation } =
  attributesApi;
