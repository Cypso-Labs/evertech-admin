import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Service {
  id: string;
  service: string;
  category: string;
  price: string;
  isEnabled: boolean;
}

interface ServicesState {
  services: Service[];
  searchTerm: string;
  currentPage: number;
}

const initialState: ServicesState = {
  services: [
    {
      id: "Service #00142",
      service: "Lorem ipsum dolor sit amet",
      category: "Lorem ipsum",
      price: "$ 99.98",
      isEnabled: true,
    },
    // Add more sample data as needed
  ],
  searchTerm: "",
  currentPage: 1,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    toggleServiceEnabled(state, action: PayloadAction<string>) {
      const service = state.services.find((s) => s.id === action.payload);
      if (service) {
        service.isEnabled = !service.isEnabled;
      }
    },
    deleteService(state, action: PayloadAction<string>) {
      state.services = state.services.filter((s) => s.id !== action.payload);
    },
  },
});

export const {
  setServices,
  setSearchTerm,
  setCurrentPage,
  toggleServiceEnabled,
  deleteService,
} = servicesSlice.actions;

export default servicesSlice.reducer;
