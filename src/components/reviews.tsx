import { memo, useEffect, useMemo } from 'react';
import { REVIEWS_LIMIT, RequestStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { reviewsActions, reviewsSelectors } from '../store/slices/reviews';
import LoggedWrapper from './logged-wrapper';
import Loading from './loading/loading';
import ReviewsItem from './reviews-item';
import ReviewForm from './review-form';

type ReviewsProps = {
  offerId: string;
}

function Reviews_({ offerId }: ReviewsProps) {
  const { fetchReviews, clear } = useActionCreators(reviewsActions);
  const sortedReviews = useAppSelector(reviewsSelectors.sortedReviews);
  const reviews = useMemo(() => sortedReviews.slice(0, REVIEWS_LIMIT), [sortedReviews]);

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
        Reviews · <span className="reviews__amount">{sortedReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .map((review) => <ReviewsItem key={review.date + review.id} review={review} />)}
      </ul>
      <LoggedWrapper>
        <ReviewForm offerId={offerId} />
      </LoggedWrapper>
    </section>
  );
}

const Reviews = memo(Reviews_);

export default Reviews;
