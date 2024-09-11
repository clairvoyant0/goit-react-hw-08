import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  name: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: INITIAL_STATE,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

// ---------- Reducer
export const filterReducer = filterSlice.reducer;


// ---------  Action creators
export const { changeFilter } = filterSlice.actions;