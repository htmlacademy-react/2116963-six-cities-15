import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { withExtraArgument } from '../../../node_modules/@reduxjs/toolkit/node_modules/redux-thunk';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { fetchOffers } from './offers';

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

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" with thunk "fetchOffers"', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);

      expect(fetchOffersFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.pending" and "fetchOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });
});
