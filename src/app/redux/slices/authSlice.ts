"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface Employee {
  name: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  employee: Employee | null;
  catogories: string[];
  loading: boolean;
  error: string | null;
}

// Move localStorage operations to a separate utility to handle SSR
const storage = {
  getItem: (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

const getStoredAuth = (): AuthState => {
  const storedAuth = storage.getItem("auth");
  if (storedAuth) {
    try {
      const parsedAuth = JSON.parse(storedAuth);
      return {
        token: parsedAuth.token,
        isAuthenticated: !!parsedAuth.token,
        employee: parsedAuth.employee,
        catogories: [],
        loading: false,
        error: null,
      };
    } catch (error) {
      console.error("Error parsing auth data from localStorage", error);
    }
  }
  return {
    token: null,
    isAuthenticated: false,
    employee: null,
    catogories: [],
    loading: false,
    error: null,
  };
};

// Ensure initial state is only computed once
const initialState: AuthState =
  typeof window !== "undefined"
    ? getStoredAuth()
    : {
        token: null,
        isAuthenticated: false,
        employee: null,
        catogories: [],
        loading: false,
        error: null,
      };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; employee: Employee }>,
    ) => {
      const { token, employee } = action.payload;
      state.token = token;
      state.employee = employee;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      storage.setItem(
        "auth",
        JSON.stringify({
          token,
          employee,
        }),
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      // Reset loading state when error occurs
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.employee = null;
      state.loading = false;
      state.error = null;

      storage.removeItem("auth");
    },
  },
});

export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;

// Memoized selector
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
