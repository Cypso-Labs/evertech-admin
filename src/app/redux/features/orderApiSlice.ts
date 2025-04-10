"use client";
import { apiSlice } from "../apiSlice";
import type { Order } from "@/types";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => "/order/",
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    createOrder: builder.mutation<Order, Omit<Order, "_id">>({
      query: (orderData) => ({
        url: "/order/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    updateOrder: builder.mutation<Order, Partial<Order> & { id: string }>({
      query: ({ id, ...updates }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    getOrdersByDateRange: builder.query<
      Order[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/orders?start=${startDate}&end=${endDate}`,
      providesTags: (result, error, { startDate, endDate }) => [
        { type: "Order", id: `${startDate}-${endDate}` },
      ],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersByDateRangeQuery,
} = orderApiSlice;
