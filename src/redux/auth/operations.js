import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 *
 */
export const instance = axios.create({
  baseURL: 'https://connections-api.goit.global',
});

/**
 * Set token to headers
 */
export const setHeaders = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/**
 *  Створення санки для реєстрації користувача.
 *    userData - дані що прийдуть з форми реєстрації
 *
 *    data, яку поверне запит матиме наступний формат i потрапить у action.payload:
 *   {
 *     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ5N2UxMGM0OTVlZDZlMjVmMzQxMGMiLCJpYXQiOjE3MjU1Mjk2MTZ9.ifT6siwf2xLcDUyZB2Et2fFQOuUmRjTz3I5FXu9cXI4"
 *     user: {name: "Dasha Yurko", email: "dariayurkodev@gmail.com"}
 *   }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const { data } = instance.post('/users/signup', userData);
      setHeaders(data.token);
      // console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 *  Створення санки для логіну.
 *    userData - дані що прийдуть з форми логіну
 */
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const response = await instance.post('/users/login', userData);
      setHeaders(response.data.token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 *  Створення санки для автоматичного.
 *    userData - дані що прийдуть з форми логіну
 */

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setHeaders(token);
      const { data } = await instance.get('/users/current');
      console.log(state);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  // перед запуском санки перевіриться умова на наявність токена,
  // якщо condition повертє true - санка виконається, інакше ні
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (token) {
        return true;
      }
      return false;
    }
  }
);

/**
 * Створення санки для розлогінення.
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
  try {
    await instance.post('/users/logout');
    return
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
});