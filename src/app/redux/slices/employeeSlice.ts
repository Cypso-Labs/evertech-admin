"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  createEmployee,
  fetchEmployees,
  fetchEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../features/employeeApi";

// Define Employee type
export interface Employee {
  _id: string;
  name: string;
  leave?: string;
  address: string;
  gender: string;
  status: string;
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
    builder
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to create employee";
      })
      // Fetch Employees
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
      })
      // Fetch Employee by ID
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
      })
      // Update Employee
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
      })
      // Delete Employee
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
