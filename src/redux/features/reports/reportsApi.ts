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
    getOrdersByPlatformCount: builder.query({
      query: (args) => ({
        url: "/reports/orders-source-count",
        params: searchParams(args),
      }),
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetOrdersCountQuery,
  useGetOrdersByPlatformCountQuery,
} = reportsApi;
