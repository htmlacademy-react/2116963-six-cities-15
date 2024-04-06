import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { withExtraArgument } from '../../../node_modules/@reduxjs/toolkit/node_modules/redux-thunk';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { FavoriteStatus } from '../../types/favorites';
import { State } from '../../types/state';
import { fetchFavorites, postFavorite } from './favorites';

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

  describe('fetchFavorites', () => {
    it('should dispatch "fetchFavorites.pending" and "fetchFavorites.fulfilled" with thunk "fetchFavorites', async () => {
      const mockOffers = [makeFakeOffer(true)];
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockOffers);

      await store.dispatch(fetchFavorites());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavorites.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.fulfilled.type,
      ]);

      expect(fetchFavoritesFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchFavorites.pending" and "fetchFavorites.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400);

      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.rejected.type,
      ]);
    });

    describe('postFavorite', () => {
      it('should dispatch "postFavorite.fulfilled" with thunk "postFavorite" and return offer', async () => {
        const offer = makeFakeOffer();
        const favoriteStatus: FavoriteStatus = {
          offerId: offer.id,
          isFavorite: !offer.isFavorite
        };
        const responseOffer = { ...offer, isFavorite: !offer.isFavorite };

        mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${favoriteStatus.offerId}/${Number(favoriteStatus.isFavorite)}`).reply(200, responseOffer);

        await store.dispatch(postFavorite(favoriteStatus));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const postFavoriteFulfilled = emittedActions.at(1) as ReturnType<typeof postFavorite.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          postFavorite.pending.type,
          postFavorite.fulfilled.type,
        ]);

        expect(postFavoriteFulfilled.payload)
          .toEqual(responseOffer);
      });
    });
  });
});
