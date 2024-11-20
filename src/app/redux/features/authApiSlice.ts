import { apiSlice } from "../apiSlice";
import type { LoginCredentials, RegisterCredentials, Employee } from "@/types";

interface LoginResponse {
  success: boolean;
  data?: { employee: Employee; token: string }; 
  message?: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      { employee: Employee; token: string }, 
      RegisterCredentials
    >({
      query: (formData) => ({
        url: "/employees/register",
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (formData) => ({
        url: "/employees/login",
        method: "POST",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;
