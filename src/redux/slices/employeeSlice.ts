import { BASE_URL } from "@/app/utils/apiConfig";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from "../store";

export interface EmployeeInterface {
  _id: string;
  name: string;
  leave?: string;
  address: string;
  gender: string;
  age: string;
  password: string;
  join_date: string;
  contact: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeState {
  entities: EmployeeInterface[];
  selectedEmployee: EmployeeInterface | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  entities: [],
  selectedEmployee: null,
  loading: "idle",
  error: null as string | null,
};

export const fetchEmployees = createAsyncThunk<
  EmployeeInterface[],
  void,
  { rejectValue: string }
>("employees/fetchEmployees", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(BASE_URL + "/employees/");

    if (!response.ok) throw new Error("Failed to fetch employees");

    const data = await response.json();
    return data.data.employees;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateEmployee = createAsyncThunk<
  EmployeeInterface,
  { id: string; employeeData: Partial<EmployeeInterface> },
  { rejectValue: string; state: RootState }
>(
  "employees/updateEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + `/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) throw new Error("Failed to update employee");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employees/deleteEmployee", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(BASE_URL + `/employees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete employee");

    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const newEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (newEmployee: {
    email: string;
    name: string;
    role: string;
    username: string;
    contact: string;
    address: string;
    gender: string;
    age: string;
    password: string;
  }) => {
    const response = await fetch(BASE_URL + "/employees/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
    if (!response.ok) {
      throw new Error("Failed to register employee");
    }
    const data = await response.json();

    return {
      ...data,
      leave: data.leave === 0 ? "Active" : data.leave,
    };
  },
);


export const selectEmployeeRoleCounts = (state: RootState) => {
  const roleCounts: { [key: string]: number } = {};

  state.employees.entities.forEach((employee) => {
    const role = employee.role; 
    if (roleCounts[role]) {
      roleCounts[role] += 1; 
    } else {
      roleCounts[role] = 1; 
    }
  });

  return roleCounts;
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSelectedEmployee: (
      state,
      action: PayloadAction<EmployeeInterface | null>,
    ) => {
      state.selectedEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
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
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(newEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(newEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities.push(action.payload);
      })
      .addCase(newEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to register employee";
      })
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
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedEmployee = action.payload;
        const index = state.entities.findIndex(
          (e) => e._id === updatedEmployee._id,
        );
        if (index !== -1) {
          state.entities[index] = updatedEmployee;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to update employee";
      });
  },
});

export const { setSelectedEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
