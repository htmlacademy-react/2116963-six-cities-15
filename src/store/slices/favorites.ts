import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Offer } from '../../types/offer';
import { fetchFavorites, postFavorite } from '../thunks/favorites';

type InitialState = {
  favorites: Offer[];
  status: RequestStatus;
}

const initialState: InitialState = {
  favorites: [],
  status: RequestStatus.Idle
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  selectors: {
    favorites: (state) => state.favorites,
    favoritesLength: (state) => state.favorites.length,
    status: (state) => state.status,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.status = RequestStatus.Succeeded;
    });
    builder.addCase(postFavorite.fulfilled, (state, action) => {
      const changedOffer = action.payload;
      if (changedOffer.isFavorite) {
        state.favorites.push(action.payload);
      } else {
        const index = state.favorites.findIndex((offer) => offer.id === changedOffer.id);
        state.favorites.splice(index, 1);
      }
    });
  },
});

const favoritesActions = {...favoritesSlice.actions, fetchFavorites, postFavorite};
const favoritesSelectors = favoritesSlice.selectors;

export { favoritesActions, favoritesSelectors, favoritesSlice };

