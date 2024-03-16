import { Offer } from '../../types/offer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setActiveId: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
    }
  },
  selectors: {
    offers: (state) => state.offers,
    activeId: (state) => state.activeId
  }
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export {offersSlice, offersActions, offersSelectors};
