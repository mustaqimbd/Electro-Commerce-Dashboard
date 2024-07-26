import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";
import searchParams from "@/utilities/searchParams";

const allAvailableProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableProducts: builder.query({
      query: (args: TQuery) => ({
        url: "/products",
        method: "GET",
        params: searchParams(args),
      }),
      //   transformResponse: (response:any) => {
      //     return {
      //       data: response.data,
      //       meta: response.meta,
      //     };
      //   },
      providesTags: ["availableProducts"],
    }),
  }),
});

export const { useGetAvailableProductsQuery } = allAvailableProductsApi;
