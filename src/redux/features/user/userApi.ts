import baseApi from "@/redux/baseApi/baseApi";
import { TQuery } from "@/types/order/order.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaffOrAdmin: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-staff-or-admin",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    getAllUsers: builder.query({
      query: ({
        status,
        startFrom,
        endAt,
        sort,
        page,
        limit,
      }: Partial<TQuery>) => ({
        url: `/users/all-admin-staff?status=${status}&startFrom=${startFrom}&endAt=${endAt}&sort=${sort || "-createdAt"}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useCreateStaffOrAdminMutation, useGetAllUsersQuery } = userApi;
