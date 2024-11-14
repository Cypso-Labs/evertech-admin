import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the possible status values
type Status = "loading" | "succeeded" | "failed" | null;

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await axios.get("/api/services");
    return response.data;
  },
);

export const createService = createAsyncThunk(
  "services/createService",
  async (data: any) => {
    // Define the type for the data being passed
    const response = await axios.post("/api/services", data);
    return response.data;
  },
);

// Define the initial state type
interface ServiceState {
  services: any[]; // Define the type for services based on your actual data structure
  status: Status; // Use the Status type for status
}

export const serviceSlice = createSlice({
  name: "services",
  initialState: { services: [], status: null } as ServiceState, // Ensure initial state matches the ServiceState type
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.status = "failed";
      });
    builder.addCase(createService.fulfilled, (state, action) => {
      state.services.push(action.payload);
    });
  },
});

export default serviceSlice.reducer;
