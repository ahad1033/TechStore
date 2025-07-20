import { setUser } from "../slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mode = "PROD";

const baseURL =
  mode === "development"
    ? "http://localhost:5000/api/v1"
    : "https://tech-store-server.onrender.com/api/v1";

const refreshURL =
  mode === "development"
    ? "http://localhost:5000/api/v1/refresh-token"
    : "https://tech-store-server.onrender.com/api/v1/refresh-token";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch(refreshURL, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    const user = api.getState().auth.user;

    api.dispatch(setUser({ user, token: data.data.accessToken }));

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
