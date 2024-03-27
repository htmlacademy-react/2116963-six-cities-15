import { useEffect } from 'react';
import { AuthorizationStatus, RequestStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { reviewsActions, reviewsSelectors } from '../store/slices/reviews';
import { compareReviewDates } from '../utils';
import CommentForm from './comment-form';
import ReviewsItem from './review-item';
import { userSelectors } from '../store/slices/user';

type ReviewsProps = {
  id: string;
  reviewsLimit: number;
}

function Reviews({ id, reviewsLimit }: ReviewsProps) {
  const { fetchReviews, clear } = useActionCreators(reviewsActions);
  const reviews = useAppSelector(reviewsSelectors.reviews);
  const status = useAppSelector(reviewsSelectors.status);
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const isLogged = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchReviews(id);
    }
  }, [fetchReviews, id, status]);

  useEffect(() => () => {
    clear();
  }, [clear, id]);

  const sortedReviews = [...reviews];
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews
          .sort(compareReviewDates)
          .slice(0, reviewsLimit)
          .map((review) => <ReviewsItem key={review.date + review.id} review={review} />)}
      </ul>
      {isLogged && <CommentForm id={id} />}
    </section>
  );
}

export default Reviews;
