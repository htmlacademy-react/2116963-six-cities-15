import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
  }
});
