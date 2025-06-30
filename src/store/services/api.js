import { setUser } from "../slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://tech-store-server.onrender.com/api/v1",
  baseUrl: "http://localhost:5000/api/v1",
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
    const res = await fetch(
      "http://localhost:5000/api/v1/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

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

// Create the base API service
// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000//api/v1",
//     prepareHeaders: (headers, { getState }) => {
//       // Get token from auth state
//       const token = getState().auth.user?.token;
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: [
//     "Category",
//     "Subcategory",
//     "Product",
//     "Order",
//     "User",
//     "Analytics",
//   ],
//   endpoints: () => ({}),
// });

// export default api;
