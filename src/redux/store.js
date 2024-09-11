import { authReduser } from './auth/slice';
import { filterReducer } from './filters/slice';
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPeristConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};


export const store = configureStore({
  reducer: {
    filters: filterReducer,
    contacts: contactsReducer,
    auth: persistReducer(authPeristConfig, authReduser),
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);