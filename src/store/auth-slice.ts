import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
};
// initial state dari token
const initialState: AuthState = {
  token: null,
  isInitialized: false,
  isAuthenticated: !!localStorage.getItem("token"),
};
// Membuat slice bernama "auth" dan menyimpan nilai token
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      //persist
      localStorage.setItem("token", action.payload);
      state.isInitialized = true;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.isInitialized = true;
      state.isAuthenticated = false;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("token");
      state.token = token;
      state.isInitialized = true;
      state.isAuthenticated = !!token;
    },
  },
});

// action setToken, logout, untuk dipakai di komponen
export const { setToken, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
