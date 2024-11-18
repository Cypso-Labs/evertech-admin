"use client";
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../customerSlice'
import serviceReducer from '../serviceSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    servicers:serviceReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch