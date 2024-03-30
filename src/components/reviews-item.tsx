import { memo } from 'react';
import type { Review } from '../types/review';
import { formatDate } from '../utils';
import Rating from './rating';

type ReviewsItemProps = {
  review: Review;
}

// eslint-disable-next-line prefer-arrow-callback
const ReviewsItem = memo(function ReviewsItem({ review }: ReviewsItemProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating classStart='reviews' rating={review.rating} />
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">
          {formatDate(review.date)}
        </time>
      </div>
    </li>
  );
});

export default ReviewsItem;
