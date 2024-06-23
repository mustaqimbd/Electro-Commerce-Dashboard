import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";

const allProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args: TQuery) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined) {
              params.append(key, value.toString());
            }
          });
        }
        return {
          url: "/products/admin",
          method: "GET",
          params: params,
        };
      },
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
      invalidatesTags: ["allProducts"],
    }),
  }),
});

export const { useGetAllProductsQuery, useDeleteProductsMutation } =
  allProductsApi;
