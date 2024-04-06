import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { withExtraArgument } from '../../../node_modules/@reduxjs/toolkit/node_modules/redux-thunk';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeFullOffer, makeFakeOffer } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { fetchNearOffers, fetchOffer } from './offer';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [withExtraArgument(axios)];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchOffer', () => {
    it('should dispatch "fetchOffer.pending" and "fetchOffer.fulfilled" with thunk "fetchOffer"', async () => {
      const offer = makeFakeOffer();
      const responseFullOffer = makeFakeFullOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offer.id}`).reply(200, responseFullOffer);

      await store.dispatch(fetchOffer(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffer.pending.type,
        fetchOffer.fulfilled.type,
      ]);

      expect(fetchOfferFulfilled.payload)
        .toEqual(responseFullOffer);
    });

    it('should dispatch "fetchOffer.pending" and "fetchOffer.rejected" when server response 400', async () => {
      const offer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offer.id}`).reply(400);

      await store.dispatch(fetchOffer(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.rejected.type,
      ]);
    });
  });

  describe('fetchNearOffers', () => {
    it('should dispatch "fetchNearOffers.pending" and "fetchNearOffers.fulfilled" with thunk "fetchNearOffers"', async () => {
      const fullOffer = makeFakeFullOffer();
      const responseNearOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${fullOffer.id}/nearby`).reply(200, responseNearOffers);

      await store.dispatch(fetchNearOffers(fullOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearOffers.pending.type,
        fetchNearOffers.fulfilled.type,
      ]);

      expect(fetchNearOffersFulfilled.payload)
        .toEqual(responseNearOffers);
    });

    it('should dispatch "fetchNearOffers.pending" and "fetchNearOffers.rejected" when server response 400', async () => {
      const fullOffer = makeFakeFullOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${fullOffer.id}/nearby`).reply(400);

      await store.dispatch(fetchNearOffers(fullOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearOffers.pending.type,
        fetchNearOffers.rejected.type,
      ]);
    });
  });
});
