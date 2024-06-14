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
    }),
    deleteProducts: builder.mutation({
      query: (productIds: string[]) => ({
        url: `/products/delete-many`,
        method: "DELETE",
        body: { productIds },
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useDeleteProductsMutation } =
  allProductsApi;
