import { useEffect } from 'react';
import { AuthorizationStatus, RequestStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { reviewsActions, reviewsSelectors } from '../store/slices/reviews';
import { userSelectors } from '../store/slices/user';
import CommentForm from './comment-form';
import ReviewsItem from './review-item';

type ReviewsProps = {
  offerId: string;
}

const REVIEWS_LIMIT = 10;

function Reviews({ offerId }: ReviewsProps) {
  const { fetchReviews, clear } = useActionCreators(reviewsActions);
  const reviews = useAppSelector(reviewsSelectors.lastReviews);
  const status = useAppSelector(reviewsSelectors.status);
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const isLogged = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchReviews(offerId);
    }
  }, [fetchReviews, offerId, status]);

  useEffect(() => () => {
    clear();
  }, [clear, offerId]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .slice(0, REVIEWS_LIMIT)
          .map((review) => <ReviewsItem key={review.date + review.id} review={review} />)}
      </ul>
      {isLogged && <CommentForm offerId={offerId} />}
    </section>
  );
}

export default Reviews;
