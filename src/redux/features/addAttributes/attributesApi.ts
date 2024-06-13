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
    deleteAttributeValue: builder.mutation({
      query: (attributeId) => ({
        url: `/attributes-value/${attributeId}`,
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
    addAttributeValue: builder.mutation({
      query: (data) => ({
        url: `/attributes-value`,
        method: "POST",
        body: data,
      }),
    }),
    updateAttribute: builder.mutation({
      query: (data) => ({
        url: `/attributes/${data.attributeId}`,
        method: "PATCH",
        body: { name: data?.name },
      }),
    }),
    updateAttributeValue: builder.mutation({
      query: (data) => ({
        url: `/attributes-value/${data?.attributeValueId}`,
        method: "PATCH",
        body: { name: data?.name },
      }),
    }),
  }),
});

export const {
  useDeleteAttributeMutation,
  useAddAttributeMutation,
  useUpdateAttributeMutation,
  useUpdateAttributeValueMutation,
  useDeleteAttributeValueMutation,
  useAddAttributeValueMutation,
} = attributesApi;
