import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { FullOffer, Offer } from '../../types/offer';
import { fetchNearOffers, fetchOffer } from '../thunks/offer';

type InitialState = {
  offer: FullOffer | null;
  nearOffers: Offer[];
  status: RequestStatus;
}

const initialState: InitialState = {
  offer: null,
  nearOffers: [],
  status: RequestStatus.Idle
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clear: (state) => {
      state.offer = null;
      state.nearOffers = [];
      state.status = RequestStatus.Idle;
    }
  },
  selectors: {
    offer: (state) => state.offer,
    nearOffers: (state) => state.nearOffers,
    status: (state) => state.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffer.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchOffer.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.status = RequestStatus.Succeeded;
    });
    builder.addCase(fetchOffer.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchNearOffers.fulfilled, (state, action) => {
      state.nearOffers = action.payload;
    });
  },
});

const offerActions = { ...offerSlice.actions, fetchOffer, fetchNearOffers };
const offerSelectors = offerSlice.selectors;

export { offerActions, offerSelectors, offerSlice };

