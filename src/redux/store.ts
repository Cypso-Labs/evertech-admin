import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import employeesReducer from "./slices/employeeSlice";

import roleReducer from "./slices/roleSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    employees: employeesReducer,
    roles: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
