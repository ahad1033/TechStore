import { api } from "../services/api";

export const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query({
      query: (role) => `/analytics/dashboard/${role}`,
      providesTags: ["Analytics"],
    }),

    getUserAnalytics: builder.query({
      query: (userId) => `/users/${userId}/analytics`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery, useGetUserAnalyticsQuery } =
  analyticsApi;
