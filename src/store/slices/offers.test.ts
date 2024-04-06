import { RequestStatus } from '../../const';
import { makeFakeOffer } from '../../mock/mock';
import { postFavorite } from '../thunks/favorites';
import { offersActions, offersSelectors, offersSlice } from './offers';

describe('Offers Slice', () => {
  describe('Reducers', () => {
    it('should return same state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offers: [makeFakeOffer()],
        activeId: 'f644d71b-def4-4a05-9878-f557b80f3ae0',
        status: RequestStatus.Succeeded
      };

      const result = offersSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offers: [],
        activeId: '',
        status: RequestStatus.Idle
      };

      const result = offersSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return new id with "setActiveId"', () => {
      const expectedId = 'test-123';

      const result = offersSlice.reducer(undefined, offersActions.setActiveId('test-123'));

      expect(result.activeId).toEqual(expectedId);
    });

    it('should return default state with "clearOffers"', () => {
      const initialState = {
        offers: [makeFakeOffer()],
        activeId: 'f644d71b-def4-4a05-9878-f557b80f3ae0',
        status: RequestStatus.Succeeded
      };
      const expectedState = {
        offers: [],
        activeId: '',
        status: RequestStatus.Idle
      };

      const result = offersSlice.reducer(initialState, offersActions.clearOffers());

      expect(result).toEqual(expectedState);
    });
  });

  describe('Selectors', () => {
    const state = {
      offers: [makeFakeOffer()],
      activeId: 'f644d71b-def4-4a05-9878-f557b80f3ae0',
      status: RequestStatus.Succeeded
    };

    it('should return offers from state', () => {
      const expectedOffers = state.offers;
      const result = offersSelectors.offers.unwrapped(state);
      expect(result).toBe(expectedOffers);
    });

    it('should return activeId from state', () => {
      const expectedActiveId = state.activeId;
      const result = offersSelectors.activeId.unwrapped(state);
      expect(result).toBe(expectedActiveId);
    });

    it('should return status from state', () => {
      const expectedStatus = state.status;
      const result = offersSelectors.status.unwrapped(state);
      expect(result).toBe(expectedStatus);
    });
  });

  describe('Extra Reducers', () => {
    it('should set RequestStatus.Loading with "fetchOffers.pending"', () => {
      const expectedStatus = RequestStatus.Loading;

      const result = offersSlice.reducer(undefined, offersActions.fetchOffers.pending('', undefined));

      expect(result.status).toEqual(expectedStatus);
    });

    it('should set offers and RequestStatus.Succeeded with "fetchOffers.pending"', () => {
      const offers = [makeFakeOffer()];
      const expectedState = {
        offers: offers,
        activeId: '',
        status: RequestStatus.Succeeded
      };

      const result = offersSlice.reducer(undefined, offersActions.fetchOffers.fulfilled(offers, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should change offer.isFavorite with "postFavorite.fulfilled"', () => {
      const offer = makeFakeOffer();
      const favoriteOffer = { ...offer, isFavorite: true };

      const initialState = {
        offers: [offer],
        activeId: 'f644d71b-def4-4a05-9878-f557b80f3ae0',
        status: RequestStatus.Succeeded
      };

      const result = offersSlice.reducer(
        initialState,
        postFavorite.fulfilled(favoriteOffer, '', { offerId: favoriteOffer.id, isFavorite: favoriteOffer.isFavorite })
      );

      expect(result.offers.find((item) => item.id === favoriteOffer.id)?.isFavorite).toBe(favoriteOffer.isFavorite);
    });
  });
});
