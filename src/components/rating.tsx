import { formatRating } from '../utils';

type RatingProps = {
  classStart: string;
  rating: number;
}

const OFFER_CLASS = 'offer';

function Rating({ classStart, rating }: RatingProps) {
  const isOffer = classStart === OFFER_CLASS;

  return (
    <div className={`${classStart}__rating rating`}>
      <div className={`${classStart}__stars rating__stars`}>
        <span style={{ width: formatRating(rating) }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {isOffer && <span className={`${classStart}__rating-value rating__value`}>{rating}</span>}
    </div>
  );
}

export default Rating;
