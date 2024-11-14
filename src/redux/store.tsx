import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';

// Create the store with the servicesReducer
const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
});

// Type for the Redux state (RootState) and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
