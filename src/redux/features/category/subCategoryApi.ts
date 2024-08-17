import baseApi from "@/redux/baseApi/baseApi";

const subcategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteSubCategory: builder.mutation({
      query: (data) => ({
        url: `/sub-categories`,
        method: "DELETE",
        body: {
          subCategoryIds: data,
        },
      }),
    }),
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/sub-categories`,
        method: "POST",
        body: data,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sub-categories/${id}`,
        method: "UPDATE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subcategoryApi;
