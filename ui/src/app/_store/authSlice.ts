"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface Tokens {
  access: string;
  refresh: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Tokens>) => {
      const { access, refresh } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;

      try {
        const decoded: any = jwtDecode(access);
        state.user = {
          id: decoded.user_id,
          username: decoded.username,
          email: decoded.email,
        };
      } catch (error) {
        console.error("Failed to decode token:", error);
        state.user = null;
        state.isAuthenticated = false;
      }

      localStorage.setItem("tokens", JSON.stringify({ access, refresh }));
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("tokens");
    },

    loadFromStorage: (state) => {
      const tokens = localStorage.getItem("tokens");
      if (tokens) {
        try {
          const { access, refresh } = JSON.parse(tokens);
          state.accessToken = access;
          state.refreshToken = refresh;
          state.isAuthenticated = true;

          const decoded: any = jwtDecode(access);
          state.user = {
            id: decoded.user_id,
            username: decoded.username,
            email: decoded.email,
          };
        } catch (error) {
          console.error("Invalid token in storage:", error);
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          localStorage.removeItem("tokens");
        }
      }
    },
  },
});

export const { setCredentials, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
