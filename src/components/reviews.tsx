import { Review } from '../types/review';
import { compareReviewDates } from '../utils';
import ReviewsItem from './review-item';
import CommentForm from './comment-form';

type ReviewsProps = {
  reviews: Review[];
  reviewsLimit: number;
}

function Reviews({ reviews, reviewsLimit }: ReviewsProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .sort(compareReviewDates)
          .slice(0, reviewsLimit)
          .map((review) => <ReviewsItem key={review.date} review={review} />)}
      </ul>
      <CommentForm />
    </section>
  );
}

export default Reviews;
