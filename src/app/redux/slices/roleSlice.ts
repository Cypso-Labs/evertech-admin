"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";

// Define the Role type
interface Role {
  _id: string;
  name: string;
  access_privilege: number[];
  createdAt: string;
  updatedAt: string;
}

// Define the state for the slice
interface RoleState {
  roles: Role[];
  selectedRole: Role | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  loading: "idle",
  error: null,
};

// Helper to get token from state
const getToken = (state: RootState): string | null =>
  state.auth?.token ||
  (localStorage.getItem("auth") &&
    JSON.parse(localStorage.getItem("auth") || "{}").token);

// Async thunk to create a new role
export const createRole = createAsyncThunk<
  Role,
  Partial<Role>,
  { rejectValue: string; state: RootState }
>("roles/createRole", async (roleData, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) throw new Error("Failed to create role");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Async thunk to fetch all roles
export const fetchRoles = createAsyncThunk<
  Role[],
  void,
  { rejectValue: string; state: RootState }
>("roles/fetchRoles", async (_, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/role`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch roles");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Async thunk to fetch a role by ID
export const fetchRoleById = createAsyncThunk<
  Role,
  string,
  { rejectValue: string; state: RootState }
>("roles/fetchRoleById", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/role/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch role");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Async thunk to update a role
export const updateRole = createAsyncThunk<
  Role,
  { id: string; roleData: Partial<Role> },
  { rejectValue: string; state: RootState }
>("roles/updateRole", async ({ id, roleData }, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) throw new Error("Failed to update role");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Async thunk to delete a role
export const deleteRole = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("roles/deleteRole", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/role/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to delete role");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Slice definition
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setSelectedRole: (state, action: PayloadAction<Role | null>) => {
      state.selectedRole = action.payload;
    },
    clearRoleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRole.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to create role";
      })
      .addCase(fetchRoles.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to fetch roles";
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role._id !== action.payload);
      });
  },
});

export const { setSelectedRole, clearRoleError } = roleSlice.actions;
export const selectRoles = (state: RootState) => state.roles;
export default roleSlice.reducer;
