import { configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { createAPI } from '../services/api';
import { userSlice } from './slices/user';
import { reviewsSlice } from './slices/reviews';
import { offerSlice } from './slices/offer';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
