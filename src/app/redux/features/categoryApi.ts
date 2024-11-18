"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";
import { Category } from "../slices/catogarySlice";

// Helper function to get token
const getToken = (state: RootState) => state.auth?.token;

// Fetch Categories
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string; state: RootState }
>("categories/fetchCategories", async (_, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Create Category
export const createCategory = createAsyncThunk<
  Category,
  Omit<Category, "_id">,
  { rejectValue: string; state: RootState }
>(
  "categories/createCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("Failed to create category");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Update Category
export const updateCategory = createAsyncThunk<
  Category,
  { id: string; data: Partial<Category> },
  { rejectValue: string; state: RootState }
>(
  "categories/updateCategory",
  async ({ id, data }, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update category");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Delete Category
export const deleteCategory = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: string; state: RootState }
>("categories/deleteCategory", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete category");
    }

    return { id, message: "Category deleted successfully" };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
