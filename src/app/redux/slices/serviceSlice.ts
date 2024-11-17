import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";

// Types
export interface Service {
  _id: string;
  name: string;
  opt_expire_date?: Date;
  category_id: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceState {
  services: Service[];
  selectedService: Service | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Helper function to get token
const getToken = (state: RootState) => state.auth?.token;

// Async Thunks
export const fetchServices = createAsyncThunk<
  Service[],
  void,
  { rejectValue: string; state: RootState }
>("services/fetchServices", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchServiceById = createAsyncThunk<
  Service,
  string,
  { rejectValue: string; state: RootState }
>("services/fetchServiceById", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch service");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createService = createAsyncThunk<
  Service,
  Omit<Service, "_id" | "createdAt" | "updatedAt">,
  { rejectValue: string; state: RootState }
>(
  "services/createService",
  async (serviceData, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) throw new Error("Failed to create service");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateService = createAsyncThunk<
  Service,
  { id: string; data: Partial<Service> },
  { rejectValue: string; state: RootState }
>(
  "services/updateService",
  async ({ id, data }, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(`${BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update service");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const deleteService = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("services/deleteService", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete service");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Initial state
const initialState: ServiceState = {
  services: [],
  selectedService: null,
  loading: "idle",
  error: null,
};

// Slice
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch services";
      })
      // Fetch Service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch service";
      })
      // Create Service
      .addCase(createService.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to create service";
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.services.findIndex(
          (service) => service._id === action.payload._id,
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        if (state.selectedService?._id === action.payload._id) {
          state.selectedService = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to update service";
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.services = state.services.filter(
          (service) => service._id !== action.payload,
        );
        if (state.selectedService?._id === action.payload) {
          state.selectedService = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to delete service";
      });
  },
});

// Export actions
export const { setSelectedService, clearError } = serviceSlice.actions;

// Export selector
export const selectServices = (state: RootState) => state.services;

// Export reducer
export default serviceSlice.reducer;
