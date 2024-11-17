"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";

// Define the authApi with updated login mutation
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + "/employees/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),

    login: builder.mutation<
      {
        token: string;
        employee: any;
      },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),

      transformResponse: (response: {
        status: string;
        data: {
          employee: {
            _id: string;
            name: string;
            address: string;
            gender: string;
            age: string;
            contact: string;
            email: string;
            username: string;
            role: string;
            createdAt: string;
            updatedAt: string;
          };
          token: string;
        };
      }) => ({
        token: response.data.token,
        employee: response.data.employee,
      }),
    }),
  }),
});

export const { useLoginMutation , useRegisterMutation } = authApi;
