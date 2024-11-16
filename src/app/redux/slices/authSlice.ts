// authSlice.ts
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
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  employee: null,
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
      state.token = action.payload.token;
      state.employee = action.payload.employee;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // Store in localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: action.payload.token,
          employee: action.payload.employee,
        }),
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.employee = null;
      state.loading = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
