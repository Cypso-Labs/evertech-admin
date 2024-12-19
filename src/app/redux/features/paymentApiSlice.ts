import { apiSlice } from "../apiSlice";
import type { Payment } from "@/types";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<Payment[], void>({
      query: () => "/payments",
    transformResponse: (response: { data: { payments: Payment[] } }) => response.data?.payments || [] ,
      providesTags: ["Payment"],
    }),
    getPaymentById: builder.query<Payment, string>({
      query: (id) => `/payments/${id}`,
      transformResponse: (response: { data: { payment: Payment } }) => response.data?.payment,
      providesTags: ["Payment"],
    }),
    createPayment: builder.mutation<
      Payment,
      Omit<Payment, "_id" | "createdAt" | "updatedAt">
    >({
      query: (paymentData) => ({
        url: "/payments",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
    updatePayment: builder.mutation<
      Payment,
      Partial<Payment> & { _id: string }
    >({
      query: ({ _id, ...updates }) => ({
        url: `/payments/${_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Payment"],
    }),
    deletePayment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApiSlice;
