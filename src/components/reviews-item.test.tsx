import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../mock/mock';
import { formatDate } from '../utils';
import ReviewsItem from './reviews-item';

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const review = makeFakeReview();

    const component = <ReviewsItem review={review} />;

    render(component);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(formatDate(review.date))).toBeInTheDocument();
  });
});
