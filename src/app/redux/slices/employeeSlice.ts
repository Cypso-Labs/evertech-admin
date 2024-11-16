"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// Define Employee type
interface Employee {
  _id: string;
  name: string;
  leave?: string;
  address: string;
  gender: string;
  age: string;
  join_date: string;
  contact?: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Define the state for the slice
interface EmployeeState {
  entities: Employee[];
  selectedEmployee: Employee | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: EmployeeState = {
  entities: [],
  selectedEmployee: null,
  loading: "idle",
  error: null,
};

// Helper to get token from state
const getToken = (state: RootState): string | null =>
  state.auth?.token ||
  (localStorage.getItem("auth") &&
    JSON.parse(localStorage.getItem("auth") || "{}").token);

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string; state: RootState }
>("employees/fetchEmployees", async (_, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch("http://localhost:5000/api/employees/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch employees");
    const data = await response.json();
    return data.data.employees;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Async thunk for fetching a specific employee by ID
export const fetchEmployeeById = createAsyncThunk<
  Employee,
  string,
  { rejectValue: string; state: RootState }
>("employees/fetchEmployeeById", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch employee");
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; employeeData: Partial<Employee> },
  { rejectValue: string; state: RootState }
>(
  "employees/updateEmployee",
  async ({ id, employeeData }, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(employeeData),
        },
      );

      if (!response.ok) throw new Error("Failed to update employee");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("employees/deleteEmployee", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to delete employee");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Slice definition
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEmployees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to fetch employees";
      });

    // Handle fetchEmployeeById
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to fetch employee";
      });

    // Handle updateEmployee
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.entities.findIndex(
          (e) => e._id === action.payload._id,
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to update employee";
      });

    // Handle deleteEmployee
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = state.entities.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to delete employee";
      });
  },
});

export const { setSelectedEmployee, clearError } = employeeSlice.actions;
export const selectEmployees = (state: RootState) => state.employees;
export default employeeSlice.reducer;
