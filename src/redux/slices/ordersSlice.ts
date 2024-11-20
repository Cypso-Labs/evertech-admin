import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BASE_URL } from "@/app/utils/apiConfig";

export type OrderStatus =
  | "placed"
  | "cancelled"
  | "processing"
  | "processed"
  | "delivered";

export interface Order {
  _id: string;
  order_id: string;
  qty: number;
  status: string;
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
  unpaidOrdersCount: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string; state: RootState }
>("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/order/`, {
      headers: {
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
>("orders/fetchOrderById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      headers: { "Content-Type": "application/json" },
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
>("orders/fetchOrderByOrderId", async (orderId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/order/by-order-id/${orderId}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch order");
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createOrder = createAsyncThunk<
  Order,
  Omit<Order, "_id" | "order_id" | "createdAt" | "updatedAt">,
  { rejectValue: string; state: RootState }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
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
>("orders/updateOrder", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      method: "PUT",
      headers: {
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
>("orders/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/order/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to delete order");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const initialState: OrderState = {
  orders: [],
  unpaidOrdersCount: 0,
  selectedOrder: null,
  loading: "idle",
  error: null,
};

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

      .addCase(fetchOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = "succeeded";
          state.orders = action.payload;
          state.unpaidOrdersCount = action.payload.filter(
            (order) => order.status === "UnPaid",
          ).length;
        },
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload ?? "Failed to fetch orders";
      })

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

export const { setSelectedOrder, clearError } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders;

export default orderSlice.reducer;
