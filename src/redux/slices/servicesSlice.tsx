import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: ServiceState = {
  services: [], // Empty initially
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
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setCurrentPage,
  toggleServiceEnabled,
  deleteService,
  setServices,
} = servicesSlice.actions;

export default servicesSlice.reducer;
