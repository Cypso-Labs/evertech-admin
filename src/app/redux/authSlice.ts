import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: { name: string; username: string; email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  token: localStorage.getItem("Bearer") || null,
  loading: false,
  error: null, // Initialize error state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: { name: string; username: string; email: string };
        token: string;
      }>,
    ) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null; // Clear error on successful login

      // Store token and user info in localStorage
      localStorage.setItem("Bearer", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // Update the error state
    },

    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.loading = false;
      state.error = null; // Clear error on logout

      // Clear localStorage on logout
      localStorage.removeItem("Bearer");
      localStorage.removeItem("userInfo");
    },
  },
});

// Export actions
export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;

export default authSlice.reducer;
