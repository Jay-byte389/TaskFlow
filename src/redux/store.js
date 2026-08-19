import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slice/snackBarSlice';
import authReducer from "./slice/authSlice";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
  },
});