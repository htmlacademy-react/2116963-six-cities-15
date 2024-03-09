import type { Offer } from '../types/offer';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PremiumMark from './premium-mark';
import BookmarkButton from './bookmark-button';
import Rating from './rating';
import Price from './price';

type CardProps = {
  classStart: string;
  offer: Offer;
  setActiveCardId?: React.Dispatch<React.SetStateAction<string>>;
}

const FAVORITES = 'favorites';

const ImageSize = {
  Basic: {
    Width: 260,
    Height: 200,
  },
  Favorites: {
    Width: 150,
    Height: 110,
  },
} as const;

function Card({ classStart, offer, setActiveCardId }: CardProps): JSX.Element {
  const isFavorites = classStart === FAVORITES;
  const currentImageSize = isFavorites ? ImageSize.Favorites : ImageSize.Basic;

  return (
    <article className={`${classStart}__card place-card`}
      onMouseEnter={() => setActiveCardId?.(offer.id)}
      onMouseLeave={() => setActiveCardId?.('')}
    >
      {offer.isPremium && <PremiumMark className='place-card__mark' />}
      <div className={`${classStart}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image"
            src={offer.previewImage}
            width={currentImageSize.Width}
            height={currentImageSize.Height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={classNames({ 'favorites-card__info': isFavorites }, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <Price classStart='place-card' price={offer.price} />
          <BookmarkButton classStart='place-card' width={18} height={19} />
        </div>
        <Rating classStart='place-card' rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
