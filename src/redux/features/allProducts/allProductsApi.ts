import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";
import searchParams from "@/utilities/searchParams";

const allProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args: TQuery) => ({
        url: "/products/admin",
        method: "GET",
        params: searchParams(args),
      }),
      // transformResponse: (response:unknown) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
      providesTags: ["allProducts"],
    }),
    deleteProducts: builder.mutation({
      query: (productIds: string[]) => ({
        url: `/products/delete`,
        method: "DELETE",
        body: { productIds },
      }),
      invalidatesTags: ["allProducts", "availableProducts"],
    }),
  }),
});

export const { useGetAllProductsQuery, useDeleteProductsMutation } =
  allProductsApi;
