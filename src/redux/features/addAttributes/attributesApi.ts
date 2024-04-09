import baseApi from "@/redux/baseApi/baseApi";

const attributesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAttribute: builder.mutation({
      query: (attributeId) => ({
        url: `/attributes/${attributeId}`,
        method: "DELETE",
        // body: {
        //   categoryIds: attributeId,
        // },
      }),
    }),
    addAttribute: builder.mutation({
      query: (data) => ({
        url: `/attributes`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useDeleteAttributeMutation, useAddAttributeMutation } =
  attributesApi;
