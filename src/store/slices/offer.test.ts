import { RequestStatus } from '../../const';
import { makeFakeFullOffer, makeFakeOffer } from '../../mock/mock';
import { offerActions, offerSelectors, offerSlice } from './offer';

describe('Offer Slice', () => {
  describe('Reducers', () => {
    it('should return same state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offer: makeFakeFullOffer(),
        nearOffers: [],
        status: RequestStatus.Succeeded
      };

      const result = offerSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offer: null,
        nearOffers: [],
        status: RequestStatus.Idle
      };

      const result = offerSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default state with "clear"', () => {
      const initialState = {
        offer: makeFakeFullOffer(),
        nearOffers: [makeFakeOffer()],
        status: RequestStatus.Succeeded
      };
      const expectedState = {
        offer: null,
        nearOffers: [],
        status: RequestStatus.Idle
      };

      const result = offerSlice.reducer(initialState, offerActions.clear());

      expect(result).toEqual(expectedState);
    });
  });

  describe('Selectors', () => {
    const state = {
      offer: makeFakeFullOffer(),
      nearOffers: [makeFakeOffer()],
      status: RequestStatus.Succeeded
    };

    it('should return offer from state', () => {
      const expectedOffer = state.offer;
      const result = offerSelectors.offer.unwrapped(state);
      expect(result).toBe(expectedOffer);
    });

    it('should return status from state', () => {
      const expectedStatus = state.status;
      const result = offerSelectors.status.unwrapped(state);
      expect(result).toBe(expectedStatus);
    });
  });

  describe('Extra Reducers', () => {
    it('should set RequestStatus.Loading with "fetchOffer.pending"', () => {
      const expectedStatus = RequestStatus.Loading;
      const offer = makeFakeOffer();

      const result = offerSlice.reducer(undefined, offerActions.fetchOffer.pending('', offer.id));

      expect(result.status).toEqual(expectedStatus);
    });

    it('should set offer and RequestStatus.Succeeded with "fetchOffer.fulfilled"', () => {
      const offer = makeFakeOffer();
      const fullOffer = makeFakeFullOffer();
      const expectedState = {
        offer: fullOffer,
        nearOffers: [],
        status: RequestStatus.Succeeded
      };

      const result = offerSlice.reducer(undefined, offerActions.fetchOffer.fulfilled(fullOffer, '', offer.id));

      expect(result).toEqual(expectedState);
    });

    it('should set RequestStatus.Failed with "fetchOffer.rejected"', () => {
      const expectedStatus = RequestStatus.Failed;
      const offer = makeFakeOffer();

      const result = offerSlice.reducer(undefined, offerActions.fetchOffer.rejected(null, '', offer.id));

      expect(result.status).toEqual(expectedStatus);
    });

    it('should set nearOffers and with "fetchNearOffers.fulfilled"', () => {
      const fullOffer = makeFakeFullOffer();
      const nearOffers = [makeFakeOffer()];
      const initialState = {
        offer: fullOffer,
        nearOffers: [],
        status: RequestStatus.Succeeded
      };
      const expectedState = {
        offer: fullOffer,
        nearOffers: nearOffers,
        status: RequestStatus.Succeeded
      };

      const result = offerSlice.reducer(initialState, offerActions.fetchNearOffers.fulfilled(nearOffers, '', fullOffer.id));

      expect(result).toEqual(expectedState);
    });
  });
});
