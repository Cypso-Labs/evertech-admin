"use client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface getServicers{
    data:[],
    loading:boolean;
    error:string | null
}

const initialState: getServicers = {
    data: [],
    loading:false,
    error:""
  }

  export const getService = createAsyncThunk("service/getService", async () => {
    // const response = await fetch('http://localhost:5000/api/services');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
    return response.json();
  });
  
  export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: { },
    extraReducers(builder){
      builder
      .addCase(getService.pending,(state)=>{
          state.loading=true
      })
      .addCase(getService.fulfilled,(state,action:PayloadAction<any>)=>{
          state.loading=false;
          state.error=null;
          state.data=action.payload;
      })
      .addCase(getService.rejected,(state,action:PayloadAction<any>)=>{
          state.loading=false;
          state.error=action.payload;
          state.data=[];
      })
    }
  })
  
  export default serviceSlice.reducer