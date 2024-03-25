import { Offer } from '../../types/offer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers } from '../thunks/offers';
import { RequestStatus } from '../../const';

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
  },
});

const offersActions = {...offersSlice.actions, fetchOffers};
const offersSelectors = offersSlice.selectors;

export { offersSlice, offersActions, offersSelectors };
