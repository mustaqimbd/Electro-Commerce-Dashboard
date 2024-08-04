import baseApi from "@/redux/baseApi/baseApi";
import searchParams from "@/utilities/searchParams";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/reports/stats",
      }),
    }),
    getOrdersCount: builder.query({
      query: (args) => ({
        url: "/reports/orders-count",
        params: searchParams(args),
      }),
    }),
  }),
});

export const { useGetStatsQuery, useGetOrdersCountQuery } = reportsApi;
