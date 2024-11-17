import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";

// Define OrderStatus as a union type for better type safety
export type OrderStatus =
  | "placed"
  | "cancelled"
  | "processing"
  | "processed"
  | "delivered";

// Update Order interface with the proper status type
export interface Order {
  _id: string;
  order_id: string;
  qty: number;
  status: OrderStatus;
  sub_total: string;
  unit_price: number;
  grand_total: number;
  order_date: Date;
  product_id: string;
  customer_id: string;
  createdAt?: string;
  updatedAt?: string;
}

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Helper function to get token
const getToken = (state: RootState) => state.auth?.token;

// Updated fetchOrders to use authorization
export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string; state: RootState }
>("orders/fetchOrders", async (_, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/order/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch orders");
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string; state: RootState }
>("orders/fetchOrderById", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch order");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchOrderByOrderId = createAsyncThunk<
  Order,
  string,
  { rejectValue: string; state: RootState }
>(
  "orders/fetchOrderByOrderId",
  async (orderId, { getState, rejectWithValue }) => {
    const token = getToken(getState());
    if (!token) return rejectWithValue("No token provided");

    try {
      const response = await fetch(`${BASE_URL}/order/by-order-id/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch order");
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const createOrder = createAsyncThunk<
  Order,
  Omit<Order, "_id" | "order_id" | "createdAt" | "updatedAt">,
  { rejectValue: string; state: RootState }
>("orders/createOrder", async (orderData, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to create order");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateOrder = createAsyncThunk<
  Order,
  { id: string; data: Partial<Order> },
  { rejectValue: string; state: RootState }
>("orders/updateOrder", async ({ id, data }, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update order");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("orders/deleteOrder", async (id, { getState, rejectWithValue }) => {
  const token = getToken(getState());
  if (!token) return rejectWithValue("No token provided");

  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete order");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Initial state
const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: "idle",
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch orders";
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch order";
      })
      // Fetch Order by Order ID
      .addCase(fetchOrderByOrderId.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchOrderByOrderId.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderByOrderId.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch order";
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to create order";
      })
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder?._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to update order";
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload,
        );
        if (state.selectedOrder?._id === action.payload) {
          state.selectedOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to delete order";
      });
  },
});

// Export actions
export const { setSelectedOrder, clearError } = orderSlice.actions;

// Export selector
export const selectOrders = (state: RootState) => state.orders;

// Export reducer
export default orderSlice.reducer;
