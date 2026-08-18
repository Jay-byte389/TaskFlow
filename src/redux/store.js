import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slice/snackBarSlice';

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});