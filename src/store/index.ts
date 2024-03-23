import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { createAPI } from '../services/api';
import { userSlice } from './slices/user';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
