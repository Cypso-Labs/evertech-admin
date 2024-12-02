"use client";

import { apiSlice } from "../apiSlice";
import type { Customer } from "@/types";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query<Customer[], void>({
      query: () => "/customers",
      
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: ["Customer"],
    }),
    getCustomerByCustomerId: builder.query<Customer, string>({
      query: (customerId) => `/customers/by-customer-id/${customerId}`,
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation<
      Customer,
      Omit<Customer, "_id" | "customer_id" | "createdAt" | "updatedAt">
    >({
      query: (customerData) => ({
        url: "/customers",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<
      Customer,
      Partial<Customer> & { _id: string }
    >({
      query: ({ _id, ...updates }) => ({
        url: `/customers/${_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useGetCustomerByCustomerIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
