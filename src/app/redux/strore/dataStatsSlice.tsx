import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DataStatsState {
  totalCustomers: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DataStatsState = {
  totalCustomers: 0,
  status: "idle",
};

// Async thunk to fetch total customers
export const fetchTotalCustomers = createAsyncThunk(
  "dataStats/fetchTotalCustomers",
  async () => {
    const response = await fetch("../services/customerService");
    const data = await response.json();
    return data.totalCustomers;
  }
);

const dataStatsSlice = createSlice({
  name: "dataStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTotalCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalCustomers = action.payload;
      })
      .addCase(fetchTotalCustomers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dataStatsSlice.reducer;
