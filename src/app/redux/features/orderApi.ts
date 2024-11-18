"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BASE_URL } from "@/app/utils/apiConfig";
import { Order } from "../slices/orderSlice";

// Helper function to get the token from the state
const getToken = (state: RootState) => state.auth?.token;

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
