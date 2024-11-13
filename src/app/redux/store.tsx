import { configureStore } from "@reduxjs/toolkit";
import dataStatsReducer from "./strore/dataStatsSlice";

const store = configureStore({
  reducer: {
    dataStats: dataStatsReducer,
  },
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
