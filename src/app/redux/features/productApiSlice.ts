"use client";

import { apiSlice } from "../apiSlice";
import type { Product } from "@/types";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "/products/",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<
      Product,
      Omit<Product, "_id" | "product_id" | "created_at" | "updated_at">
    >({
      query: (productData) => ({
        url: "/products/",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      Product,
      Partial<Product> & { _id: string }
    >({
      query: ({ _id, ...updates }) => ({
        url: `/products/${_id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
