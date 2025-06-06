// src/app/redux/features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store/store";
import { BASE_URL } from "../utils/apiConfig";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Employee",
    "Role",
    "Order",
    "Service",
    "Categories",  
    "Customer",
    "Payment",
    "Product",
    "jobs",
    "applyjobs",
    "Connect"
  ],
  endpoints: () => ({}),
});