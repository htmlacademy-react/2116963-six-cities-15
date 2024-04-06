import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { withExtraArgument } from '../../../node_modules/@reduxjs/toolkit/node_modules/redux-thunk';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeReview } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { fetchReviews, postReview } from './reviews';
import { ReviewToSend } from '../../types/review';

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

  describe('fetchReviews', () => {
    it('should dispatch "fetchReviews.pending" and "fetchReviews.fulfilled" with thunk "fetchReviews"', async () => {
      const mockReviews = [makeFakeReview()];
      const offer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offer.id}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviews.pending" and "fetchReviews.rejected" when server response 400', async () => {
      const offer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offer.id}`).reply(404);

      await store.dispatch(fetchReviews(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });

    describe('postReviews', () => {
      it('should dispatch "postReview.fulfilled" with thunk "postReview" and return review', async () => {
        const offer = makeFakeOffer();
        const reviewToSend: ReviewToSend = {
          offerId: offer.id,
          reviewInfo: {
            comment: 'Comment',
            rating: 4
          }
        };
        const responseReview = makeFakeReview();

        mockAxiosAdapter.onPost(`${APIRoute.Comments}/${reviewToSend.offerId}`, reviewToSend.reviewInfo).reply(201, responseReview);

        await store.dispatch(postReview(reviewToSend));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const postReviewFulfilled = emittedActions.at(1) as ReturnType<typeof postReview.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          postReview.pending.type,
          postReview.fulfilled.type,
        ]);

        expect(postReviewFulfilled.payload)
          .toEqual(responseReview);
      });
    });
  });
});
