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
      query: (categoryName) => ({
        url: `/categories`,
        method: "POST",
        body: {
          name: categoryName,
        },
      }),
    }),
  }),
});

export const { useDeleteCategoryMutation, useAddCategoryMutation } =
  categoryApi;
