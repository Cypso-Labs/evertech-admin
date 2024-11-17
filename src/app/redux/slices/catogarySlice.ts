"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";
// Types
export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Helper function to get token
const getToken = (state: RootState) => state.auth?.token;

// Async Thunks
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

export const deleteCategory = createAsyncThunk<
  string,
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

    if (!response.ok) throw new Error("Failed to delete category");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Slice
const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: "idle",
  error: null,
};

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
      .addCase(deleteCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload,
        );
        if (state.selectedCategory?._id === action.payload) {
          state.selectedCategory = null;
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

// Actions
export const { setSelectedCategory, clearError } = categorySlice.actions;
export const selectCategory = (state: RootState) => state.roles;
export default categorySlice.reducer;
