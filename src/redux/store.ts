import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import employeesReducer from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
