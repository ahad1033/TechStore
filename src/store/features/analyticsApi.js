import { api } from "../services/api";

export const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsSummary: builder.query({
      query: () => "/analytics/get-analytics",
      providesTags: ["Analytics"],
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }),
  }),
});

export const { useGetAnalyticsSummaryQuery } = analyticsApi;
