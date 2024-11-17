import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state definition
const initialState = {
  orders: [] as Array<{ id: number; name: string; status: string; service: string; price: number }>,
  unpaidOrdersCount: 0,
  loading: false,
  error: null as string | null,
};

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch('http://localhost:5000/api/order');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json(); 
});

// Slice creation
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    
    fetchOrder: (state, action: PayloadAction<{ id: number; service: string; status: string; name: string; price: number }>) => {
      const { id, service, status, name, price } = action.payload;
      state.orders.push({ id, service, status, name, price });


      if (action.payload.status === "UnPaid") {
        state.unpaidOrdersCount += 1;
      }}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.orders = action.payload; 


         // Calculate unpaid orders count dynamically
         state.unpaidOrdersCount = action.payload.filter((order) => order.status === 'UnPaid').length;
        
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  }
});

// Export actions and reducer
export const { fetchOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
