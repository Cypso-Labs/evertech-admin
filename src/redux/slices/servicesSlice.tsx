import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the possible status values
type Status = "loading" | "succeeded" | "failed" | null;

// Define the Service type
type Service = {
  id: string;
  service: string;
  category: string;
  price: string;
  isEnabled: boolean;
};

// Define the initial state type
interface ServiceState {
  services: Service[]; // Array of services
  status: Status; // Loading status
  searchTerm: string; // Search term for filtering services
  currentPage: number; // Pagination current page
}

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await axios.get("/api/services");
    return response.data;
  },
);

export const createService = createAsyncThunk(
  "services/createService",
  async (data: Service) => {
    const response = await axios.post("/api/services", data);
    return response.data;
  },
);

const initialState: ServiceState = {
  services: [],
  status: null,
  searchTerm: "",
  currentPage: 1,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleServiceEnabled: (state, action: PayloadAction<string>) => {
      const service = state.services.find((s) => s.id === action.payload);
      if (service) {
        service.isEnabled = !service.isEnabled;
      }
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter((s) => s.id !== action.payload);
    },
  },
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
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      });
  },
});

export const {
  setSearchTerm,
  setCurrentPage,
  toggleServiceEnabled,
  deleteService,
} = servicesSlice.actions;

export default servicesSlice.reducer;
