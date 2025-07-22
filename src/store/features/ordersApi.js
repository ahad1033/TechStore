import { api } from "../services/api";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = { page, limit };
        if (search !== "") {
          params.search = search;
        }
        return { url: "/orders/get-orders", params };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Order", id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    // getOrder: builder.query({
    //   query: (id) => `/orders/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Order", id }],
    // }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  // useGetOrderQuery,
  useUpdateOrderMutation,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
