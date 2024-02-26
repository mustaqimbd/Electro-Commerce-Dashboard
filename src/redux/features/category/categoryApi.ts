import baseApi from "@/redux/baseApi/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCategory: builder.mutation({
      query: (categoryIds) => ({
        url: `/categories`,
        method: "DELETE",
        body: {
          categoryIds,
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
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/sub-categories`,
        method: "POST",
        body: {
          name: data.name,
          category: data.categoryId,
        },
      }),
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useAddSubCategoryMutation,
} = categoryApi;
