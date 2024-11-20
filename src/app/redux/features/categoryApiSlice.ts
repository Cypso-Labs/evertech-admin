"use client";
import { apiSlice } from "../apiSlice";
import type { Category } from "@/types";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<Category, Omit<Category, "_id">>({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<
      Category,
      Partial<Category> & { id: string }
    >({
      query: ({ id, ...updates }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApiSlice;

