import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { loadOffers } from './action';
import { offers } from '../mocks/offers';

type InitialState = {
  offers: Offer[];
}

const initialState: InitialState = {
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
