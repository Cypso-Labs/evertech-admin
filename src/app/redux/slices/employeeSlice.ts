"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define types based on your backend model
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

interface EmployeeState {
  entities: Employee[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  selectedEmployee: Employee | null;
}

interface ApiResponse {
  status: string;
  data: {
    employees: Employee[];
  };
}

// Create interface for update payload
interface UpdateEmployeePayload {
  id: string;
  employeeData: Partial<Employee>;
}

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/employees/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add Bearer token
          "Content-Type": "application/json",
        },
      });

      const data: ApiResponse = await response.json();

      if (data.status !== "success") {
        throw new Error("Failed to fetch employees");
      }

      return data.data.employees;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Fetch an employee by ID
export const fetchEmployeeById = createAsyncThunk<Employee, string>(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`);
      
      const data = await response.json();

      if (!data) {
        throw new Error("Employee not found");
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Update an employee's information
export const updateEmployee = createAsyncThunk<Employee, UpdateEmployeePayload>(
  "employees/updateEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        },
      );

      const data = await response.json();

      if (!data) {
        throw new Error("Failed to update employee");
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Delete an employee
export const deleteEmployee = createAsyncThunk<string, string>(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const initialState: EmployeeState = {
  entities: [],
  loading: "idle",
  error: null,
  selectedEmployee: null,
};

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
    // Fetch all employees
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
        state.error = action.payload as string;
      });

    // Fetch an employee by ID
    builder
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedEmployee = action.payload;
        const index = state.entities.findIndex(
          (e) => e._id === action.payload._id,
        );
        if (index === -1) {
          state.entities.push(action.payload);
        } else {
          state.entities[index] = action.payload;
        }
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Update an employee
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
        if (state.selectedEmployee?._id === action.payload._id) {
          state.selectedEmployee = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Delete an employee
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = state.entities.filter((e) => e._id !== action.payload);
        if (state.selectedEmployee?._id === action.payload) {
          state.selectedEmployee = null;
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedEmployee, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
