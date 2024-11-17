"use client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface CounterState {
    data: [],
    loading:boolean,
    error:String | null
  }


const initialState: CounterState = {
  data: [],
  loading:false,
  error:""
}

// const getuser =createAsyncThunk("user",async()=>{
//     return fetch("https://jsonplaceholder.typicode.com/users")
//     .then(res => res.json)
// })

export const getCustomer = createAsyncThunk("customer/getCustomer", async () => {
  const response = await fetch('http://localhost:5000/api/customers/');
  // const response = await fetch('https://jsonplaceholder.typicode.com/users');

  return response.json();
});

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: { },
  extraReducers(builder){
    builder
    .addCase(getCustomer.pending,(state)=>{
        state.loading=true
    })
    .addCase(getCustomer.fulfilled,(state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.error=null;
        state.data=action.payload;
    })
    .addCase(getCustomer.rejected,(state,action:PayloadAction<any>)=>{
        state.loading=false;
        state.error=action.payload;
        state.data=[];
    })
  }
})

export default customerSlice.reducer