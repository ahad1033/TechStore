import { api } from "../services/api";

export const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signUp: builder.mutation({
      query: ({ userData }) => ({
        url: `/auth/signup`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = wishlistApi;
