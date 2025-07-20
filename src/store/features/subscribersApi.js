import { api } from "../services/api";

export const subscribersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = { page, limit };
        if (search !== "") {
          params.search = search;
        }
        return { url: "/subscribers/get-subscriber", params };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Subscriber", id })),
              { type: "Subscriber", id: "LIST" },
            ]
          : [{ type: "Subscriber", id: "LIST" }],
    }),

    createSubscriber: builder.mutation({
      query: (data) => ({
        url: "/subscribers/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Subscriber", id: "LIST" }],
    }),

    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `/subscribers/delete-subscriber/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Subscriber", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useCreateSubscriberMutation,
  useDeleteSubscriberMutation,
} = subscribersApi;
