"use client";
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../customerSlice'
import serviceReducer from '../serviceSlice'
import getCategoryReducer from '../getCategorySlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    servicers:serviceReducer,
    category:getCategoryReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch