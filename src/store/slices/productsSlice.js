import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    search: "",
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.pagination.totalItems = action.payload.length;
    },

    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filters change
    },

    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
  },
});

export const {
  setProducts,
  setFeaturedProducts,
  setCategories,
  setLoading,
  setError,
  setFilters,
  setCurrentPage,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
