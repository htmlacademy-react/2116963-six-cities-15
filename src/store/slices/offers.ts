import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Offer } from '../../types/offer';
import { fetchOffers } from '../thunks/offers';
import { postFavorite } from '../thunks/favorites';

type InitialState = {
  offers: Offer[];
  activeId: string;
  status: RequestStatus;
}

const initialState: InitialState = {
  offers: [],
  activeId: '',
  status: RequestStatus.Idle
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
    activeId: (state) => state.activeId,
    status: (state) => state.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = RequestStatus.Succeeded;
    });
    builder.addCase(postFavorite.fulfilled, (state, action) => {
      const changedOffer = action.payload;
      const offerToChange = state.offers.find((offer) => offer.id === changedOffer.id);
      if (offerToChange) {
        offerToChange.isFavorite = changedOffer.isFavorite;
      }
    });
  },
});

const offersActions = { ...offersSlice.actions, fetchOffers };
const offersSelectors = offersSlice.selectors;

export { offersActions, offersSelectors, offersSlice };

