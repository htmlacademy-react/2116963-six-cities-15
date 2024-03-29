import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Offer } from '../../types/offer';
import { fetchNearOffers } from '../thunks/offer';

type InitialState = {
  nearOffers: Offer[];
  status: RequestStatus;
}

const initialState: InitialState = {
  nearOffers: [],
  status: RequestStatus.Idle
};

const nearOffersSlice = createSlice({
  name: 'nearOffers',
  initialState,
  reducers: {},
  selectors: {
    nearOffers: (state) => state.nearOffers,
    status: (state) => state.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNearOffers.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchNearOffers.fulfilled, (state, action) => {
      state.nearOffers = action.payload;
      state.status = RequestStatus.Succeeded;
    });
  },
});

const nearOffersActions = { ...nearOffersSlice.actions, fetchNearOffers };
const nearOffersSelectors = nearOffersSlice.selectors;

export { nearOffersActions, nearOffersSelectors, nearOffersSlice };

