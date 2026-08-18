import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    visible: false,
    message: '',
    type: 'success', 
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnackbar: (state) => {
      state.visible = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;