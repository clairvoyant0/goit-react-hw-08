import { createSlice } from '@reduxjs/toolkit';
import { register, login, refreshUser, logout } from './operations';

// 1 --------------- State
const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

// 2 --------------- Slice

/**
 *    data, яку поверне запит матиме наступний формат i потрапить у action.payload:
 *   {
 *     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ5N2UxMGM0OTVlZDZlMjVmMzQxMGMiLCJpYXQiOjE3MjU1Mjk2MTZ9.ifT6siwf2xLcDUyZB2Et2fFQOuUmRjTz3I5FXu9cXI4"
 *     user: {name: "Dasha Yurko", email: "dariayurkodev@gmail.com"}
 *   }
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })



      .addCase(login.pending, state => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })




      .addCase(refreshUser.pending, (state, action) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = action.payload;       
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })




      .addCase(logout.pending, state => {
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        return INITIAL_STATE;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      }),
});

// 3 --------------- Reducer
export const authReduser = authSlice.reducer;