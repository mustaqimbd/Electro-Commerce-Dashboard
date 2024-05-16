import baseApi from "@/redux/baseApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/users/profile",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
