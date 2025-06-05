import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import { backendApi } from "./backend-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
