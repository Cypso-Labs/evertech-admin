"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BASE_URL } from "@/app/utils/apiConfig";

export interface Role {
  _id: string;
  name: string;
  access_privilege: number[];
  createdAt: string;
  updatedAt: string;
}

interface RoleState {
  roles: Role[];
  selectedRole: Role | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  loading: "idle",
  error: null,
};

export const createRole = createAsyncThunk<
  Role,
  Partial<Role>,
  { rejectValue: string; state: RootState }
>("roles/createRole", async (roleData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const fetchRoles = createAsyncThunk<
  Role[],
  void,
  { rejectValue: string; state: RootState }
>("roles/fetchRoles", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/role`);

    if (!response.ok) throw new Error("Failed to fetch roles");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchRoleById = createAsyncThunk<
  Role,
  string,
  { rejectValue: string; state: RootState }
>("roles/fetchRoleById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/role/${id}`);

    if (!response.ok) throw new Error("Failed to fetch role");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateRole = createAsyncThunk<
  Role,
  { id: string; roleData: Partial<Role> },
  { rejectValue: string; state: RootState }
>("roles/updateRole", async ({ id, roleData }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

export const deleteRole = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("roles/deleteRole", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(BASE_URL + `/role/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete role");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

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
      })
      .addCase(fetchRoleById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedRole = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to fetch role";
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedRole = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to update role";
      });
  },
});

export const { setSelectedRole, clearRoleError } = roleSlice.actions;
export const selectRoles = (state: RootState) => state.roles;
export default roleSlice.reducer;
