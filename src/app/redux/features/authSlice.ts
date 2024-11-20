
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Employee } from "@/types";

interface AuthState {
  employee: Employee | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  employee: null,
  token: null,
  isAuthenticated: false,
};

const storage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
  setItem: (key: string, value: any) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    employee: storage.getItem("user"),
    token: storage.getItem("token"),
    isAuthenticated: storage.getItem("token") !== null,
  },
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ employee: Employee; token: string }>,
    ) => {
      state.employee = action.payload.employee;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      storage.setItem("token", action.payload.token);
      storage.setItem("user", action.payload.employee);
    },
    logout: (state) => {
      state.employee = null;
      state.token = null;
      state.isAuthenticated = false;
      storage.removeItem("token");
      storage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectEmployee = (state: RootState) => state.auth.employee;

export default authSlice.reducer;