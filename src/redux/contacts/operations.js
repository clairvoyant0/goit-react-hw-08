import { instance } from '../auth/operations';
import { createAsyncThunk } from '@reduxjs/toolkit';



// -------------- Створення санки ---------------- /
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// --------------------------------------------- /

// ----------- Санка для видалення контакту ---- /
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactID, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactID}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
// --------------------------------------------- /

// ----------- Санка для додавання контакту ---- /
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const { data } = await instance.post(`/contacts`, contactData);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
// --------------------------------------------- /