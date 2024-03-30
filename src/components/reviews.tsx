import { memo, useEffect } from 'react';
import { RequestStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { reviewsActions, reviewsSelectors } from '../store/slices/reviews';
import LoggedWrapper from './logged-wrapper';
import Loading from './loading/loading';
import ReviewsItem from './review-item';
import CommentForm from './comment-form';

type ReviewsProps = {
  offerId: string;
}

// eslint-disable-next-line prefer-arrow-callback
const Reviews = memo(function Reviews({ offerId }: ReviewsProps) {
  const { fetchReviews, clear } = useActionCreators(reviewsActions);
  const reviews = useAppSelector(reviewsSelectors.lastReviews);
  const status = useAppSelector(reviewsSelectors.status);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchReviews(offerId);
    }
  }, [fetchReviews, offerId, status]);

  useEffect(() => () => {
    clear();
  }, [clear, offerId]);

  if (status === RequestStatus.Idle || status === RequestStatus.Loading) {
    return (
      <section className="offer__reviews reviews" style={{ position: 'relative' }}>
        <h2 className="reviews__title">
          Reviews
        </h2>
        <Loading />
      </section>
    );
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {status === RequestStatus.Succeeded}
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewsItem key={review.date + review.id} review={review} />)}
      </ul>
      <LoggedWrapper>
        <CommentForm offerId={offerId} />
      </LoggedWrapper>
    </section>
  );
});

export default Reviews;
