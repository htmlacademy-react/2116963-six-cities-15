import { Offer } from '../../types/offer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from '../thunks/offers';

type InitialState = {
  offers: Offer[];
  activeId: string;
}

const initialState: InitialState = {
  offers: [],
  activeId: '',
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
    }
  },
  selectors: {
    offers: (state) => state.offers,
    activeId: (state) => state.activeId
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
    });
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export { offersSlice, offersActions, offersSelectors };
