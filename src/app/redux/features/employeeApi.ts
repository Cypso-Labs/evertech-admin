"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";
import { Employee } from "../slices/employeeSlice";

// Helper to get token from state
const getToken = (state: RootState): string | null =>
  state.auth?.token ||
  (localStorage.getItem("auth") &&
    JSON.parse(localStorage.getItem("auth") || "{}").token);

// Async thunk for creating an employee
export const createEmployee = createAsyncThunk<
  Employee,
  Employee,
  { rejectValue: string; state: RootState }
>(
  "employees/createEmployee",
  async (employee, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) throw new Error("Failed to create employee");

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string; state: RootState }
>("employees/fetchEmployees", async (_, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/employees/`, {
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
    const response = await fetch(`${BASE_URL}/employees/${id}`, {
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
      const response = await fetch(`${BASE_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("employees/deleteEmployee", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/employees/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to delete employee");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
