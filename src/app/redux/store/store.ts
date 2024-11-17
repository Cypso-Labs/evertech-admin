"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../features/authApi";
import authReducer from "../slices/authSlice";
import employeeReducer from "../slices/employeeSlice";
import rolesReducer from "../slices/roleSlice";
import categoryReducer from "../slices/catogarySlice";
import servicesReducer from "../slices/serviceSlice";
import ordersReducer from "../slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    employees: employeeReducer,
    roles: rolesReducer,
    categories: categoryReducer,
    services: servicesReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
