import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedOut: false,
  },
  reducers: {
    setLoggedOut: (state, action) => {
      state.isLoggedOut = action.payload;
    },
  },
});

export const { setLoggedOut } = authSlice.actions;
export default authSlice.reducer;