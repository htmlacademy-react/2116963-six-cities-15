import { render, screen } from '@testing-library/react';
import { APIRoute, RequestStatus } from '../const';
import { extractActionsTypes, makeFakeOffer, makeFakeReview, makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import { fetchReviews } from '../store/thunks/reviews';
import Reviews from './reviews';

describe('Component: Reviews', () => {
  it('should call fetchReviews', () => {
    const offerId = makeFakeOffer().id;

    const componentWithHistory = withHistory(<Reviews offerId={offerId} />);
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(componentWithHistory, makeFakeStore());
    mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, [makeFakeReview(), makeFakeReview()]);

    render(withStoreComponent);

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      fetchReviews.pending.type
    ]);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('should render correctly when loaded', () => {
    const offerId = makeFakeOffer().id;
    const reviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];

    const componentWithHistory = withHistory(<Reviews offerId={offerId} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      reviews: {
        reviews: reviews,
        status: RequestStatus.Succeeded
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(reviews.length)).toBeInTheDocument();
    reviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
    });
  });
});
