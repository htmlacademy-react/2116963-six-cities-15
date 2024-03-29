import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Review } from '../../types/review';
import { compareReviewDates } from '../../utils';
import { fetchReviews, postReview } from '../thunks/reviews';

type InitialState = {
  reviews: Review[];
  status: RequestStatus;
}

const initialState: InitialState = {
  reviews: [],
  status: RequestStatus.Idle
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clear: (state) => {
      state.reviews = [];
      state.status = RequestStatus.Idle;
    }
  },
  selectors: {
    reviews: (state) => state.reviews,
    status: (state) => state.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status = RequestStatus.Succeeded;
    });
    builder.addCase(postReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
    });
  },
});

const reviewsActions = { ...reviewsSlice.actions, fetchReviews, postReview };
const reviewsSelectors = {
  ...reviewsSlice.selectors,
  lastReviews: createSelector(reviewsSlice.selectors.reviews, (reviews) => reviews.toSorted(compareReviewDates))
};

export { reviewsActions, reviewsSelectors, reviewsSlice };

