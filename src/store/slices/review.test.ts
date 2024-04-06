import { RequestStatus } from '../../const';
import { makeFakeOffer, makeFakeReview } from '../../mock/mock';
import { ReviewToSend } from '../../types/review';
import { postReview } from '../thunks/reviews';
import { reviewsActions, reviewsSelectors, reviewsSlice } from './reviews';

describe('Reviews Slice', () => {
  describe('Reducers', () => {
    it('should return same state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [makeFakeReview()],
        status: RequestStatus.Succeeded
      };

      const result = reviewsSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [],
        status: RequestStatus.Idle
      };

      const result = reviewsSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default state with "clear"', () => {
      const initialState = {
        reviews: [makeFakeReview()],
        status: RequestStatus.Succeeded
      };
      const expectedState = {
        reviews: [],
        status: RequestStatus.Idle
      };

      const result = reviewsSlice.reducer(initialState, reviewsActions.clear());

      expect(result).toEqual(expectedState);
    });
  });

  describe('Selectors', () => {
    const state = {
      reviews: [makeFakeReview()],
      status: RequestStatus.Succeeded
    };

    it('should return reviews from state', () => {
      const expectedOffers = state.reviews;
      const result = reviewsSelectors.reviews.unwrapped(state);
      expect(result).toBe(expectedOffers);
    });

    it('should return status from state', () => {
      const expectedStatus = state.status;
      const result = reviewsSelectors.status.unwrapped(state);
      expect(result).toBe(expectedStatus);
    });
  });

  describe('Extra Reducers', () => {
    it('should set RequestStatus.Loading with "fetchReviews.pending"', () => {
      const expectedStatus = RequestStatus.Loading;
      const offer = makeFakeOffer();

      const result = reviewsSlice.reducer(undefined, reviewsActions.fetchReviews.pending('', offer.id));

      expect(result.status).toEqual(expectedStatus);
    });

    it('should set reviews and RequestStatus.Succeeded with "fetchReviews.fulfilled"', () => {
      const offer = makeFakeOffer();
      const reviews = [makeFakeReview()];
      const expectedState = {
        reviews: reviews,
        status: RequestStatus.Succeeded
      };

      const result = reviewsSlice.reducer(undefined, reviewsActions.fetchReviews.fulfilled(reviews, '', offer.id));

      expect(result).toEqual(expectedState);
    });

    it('should add review to reviews', () => {
      const offer = makeFakeOffer();
      const review = makeFakeReview();
      const reviewToSend: ReviewToSend = {
        offerId: offer.id,
        reviewInfo: {
          comment: 'Comment',
          rating: 4
        }
      };
      const initialState = {
        reviews: [],
        status: RequestStatus.Succeeded
      };
      const expectedReviews = [review];

      const result = reviewsSlice.reducer(
        initialState,
        postReview.fulfilled(review, '', reviewToSend)
      );

      expect(result.reviews).toEqual(expectedReviews);
    });
  });
});
