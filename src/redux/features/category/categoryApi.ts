import baseApi from "@/redux/baseApi/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "DELETE",
        body: {
          categoryIds: data,
        },
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
