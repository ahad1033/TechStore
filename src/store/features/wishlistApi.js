import { api } from "../services/api";

export const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (userId) => `/users/${userId}/wishlist`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),

    addToWishlist: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/users/${userId}/wishlist`,
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/users/${userId}/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
