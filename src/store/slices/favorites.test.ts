import { RequestStatus } from '../../const';
import { makeFakeOffer } from '../../mock/mock';
import { Offer } from '../../types/offer';
import { postFavorite } from '../thunks/favorites';
import { favoritesActions, favoritesSelectors, favoritesSlice } from './favorites';

describe('Favorites Slice', () => {
  describe('Reducers', () => {
    it('should return same state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        favorites: [makeFakeOffer(true)],
        status: RequestStatus.Succeeded
      };

      const result = favoritesSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        favorites: [],
        status: RequestStatus.Idle
      };

      const result = favoritesSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default state with "clearFavorites"', () => {
      const initialState = {
        favorites: [makeFakeOffer(true)],
        status: RequestStatus.Succeeded
      };
      const expectedState = {
        favorites: [],
        status: RequestStatus.Idle
      };

      const result = favoritesSlice.reducer(initialState, favoritesActions.clearFavorites());

      expect(result).toEqual(expectedState);
    });
  });

  describe('Selectors', () => {
    const state = {
      favorites: [makeFakeOffer(true)],
      status: RequestStatus.Succeeded
    };

    it('should return favorites from state', () => {
      const expectedFavorites = state.favorites;
      const result = favoritesSelectors.favorites.unwrapped(state);
      expect(result).toBe(expectedFavorites);
    });

    it('should return status from state', () => {
      const expectedStatus = state.status;
      const result = favoritesSelectors.status.unwrapped(state);
      expect(result).toBe(expectedStatus);
    });
  });

  describe('Extra Reducers', () => {
    it('should set RequestStatus.Loading with "fetchFavorites.pending"', () => {
      const expectedStatus = RequestStatus.Loading;

      const result = favoritesSlice.reducer(undefined, favoritesActions.fetchFavorites.pending('', undefined));

      expect(result.status).toEqual(expectedStatus);
    });

    it('should set favorites and RequestStatus.Succeeded with "fetchFavorites.fulfilled"', () => {
      const favorites = [makeFakeOffer(true)];
      const expectedState = {
        favorites: favorites,
        status: RequestStatus.Succeeded
      };

      const result = favoritesSlice.reducer(undefined, favoritesActions.fetchFavorites.fulfilled(favorites, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should add offer to favorites', () => {
      const favoriteOffer = makeFakeOffer(true);
      const initialState = {
        favorites: [],
        status: RequestStatus.Succeeded
      };
      const expectedFavorites: Offer[] = [favoriteOffer];

      const result = favoritesSlice.reducer(
        initialState,
        postFavorite.fulfilled(favoriteOffer, '', { offerId: favoriteOffer.id, isFavorite: favoriteOffer.isFavorite })
      );

      expect(result.favorites).toEqual(expectedFavorites);
    });

    it('should remove offer from favorites', () => {
      const favoriteOffer = makeFakeOffer(true);
      const offer = { ...favoriteOffer, isFavorite: false };

      const initialState = {
        favorites: [favoriteOffer],
        status: RequestStatus.Succeeded
      };
      const expectedFavorites: Offer[] = [];

      const result = favoritesSlice.reducer(
        initialState,
        postFavorite.fulfilled(offer, '', { offerId: offer.id, isFavorite: offer.isFavorite })
      );

      expect(result.favorites).toEqual(expectedFavorites);
    });
  });
});
