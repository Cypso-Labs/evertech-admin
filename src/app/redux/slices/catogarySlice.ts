"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/categoryApi";

// Category Type Definition
export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// Category State Definition
interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  deletingIds: string[];
}

// Initial State
const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: "idle",
  error: null,
  deletingIds: [],
};

// Slice Definition
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch categories";
      })
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to create category";
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to update category";
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state, action) => {
        state.deletingIds.push(action.meta.arg);
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload.id,
        );
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.payload.id,
        );
        if (state.selectedCategory?._id === action.payload.id) {
          state.selectedCategory = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deletingIds = state.deletingIds.filter(
          (id) => id !== action.meta.arg,
        );
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

// Actions
export const { setSelectedCategory, clearError } = categorySlice.actions;
export const selectCategories = (state: RootState) => state.categories;

// Export Reducer
export default categorySlice.reducer;
