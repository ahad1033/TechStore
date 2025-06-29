import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, ...user } = action.payload;

      state.user = user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, logout, clearError } = authSlice.actions;

export default authSlice.reducer;

// USER TOKEN
export const useCurrentToken = (state) => state.auth.token;

// USER INFO
export const useCurrentUser = (state) => state.auth.user;
