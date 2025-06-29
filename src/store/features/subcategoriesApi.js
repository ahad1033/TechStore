import { api } from "../services/api";

export const subcategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategories: builder.query({
      query: ({ page = 1, limit = 10, search = "", categoryId }) => ({
        url: "/subcategories",
        params: { page, limit, search, categoryId },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Subcategory", id })),
              { type: "Subcategory", id: "LIST" },
            ]
          : [{ type: "Subcategory", id: "LIST" }],
    }),

    getSubcategory: builder.query({
      query: (id) => `/subcategories/${id}`,
      providesTags: (result, error, id) => [{ type: "Subcategory", id }],
    }),

    createSubcategory: builder.mutation({
      query: (data) => ({
        url: "/subcategories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Subcategory", id: "LIST" }],
    }),

    updateSubcategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/subcategories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Subcategory", id },
        { type: "Subcategory", id: "LIST" },
      ],
    }),

    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `/subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Subcategory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSubcategoriesQuery,
  useGetSubcategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subcategoriesApi;
