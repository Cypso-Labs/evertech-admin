"use client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface getCategory{
    data:[],
    loading:boolean;
    error:string | null
}

const initialState: getCategory = {
    data: [],
    loading:false,
    error:""
  }

  export const getcategory = createAsyncThunk("category/getCategory", async () => {
    const response = await fetch('http://localhost:5000/api/categories/');
    return response.json();
  });
  
  export const getCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: { },
    extraReducers(builder){
      builder
      .addCase(getcategory.pending,(state)=>{
          state.loading=true
      })
      .addCase(getcategory.fulfilled,(state,action:PayloadAction<any>)=>{
          state.loading=false;
          state.error=null;
          state.data=action.payload;
      })
      .addCase(getcategory.rejected,(state,action:PayloadAction<any>)=>{
          state.loading=false;
          state.error=action.payload;
          state.data=[];
      })
    }
  })
  
  export default getCategorySlice.reducer