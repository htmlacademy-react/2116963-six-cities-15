import type { Offer } from '../types/offer';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import classNames from 'classnames';
import { formatRating } from '../utils';

type CardProps = {
  classStart: string;
  offer: Offer;
  setActiveCardId?: React.Dispatch<React.SetStateAction<string>>;
}

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
  const currentPath = useLocation().pathname;
  const isPathFavorites = currentPath === AppRoute.Favorites;

  const currentImageSize = isPathFavorites ? ImageSize.Favorites : ImageSize.Basic;

  return (
    <article className={`${classStart}__card place-card`}
      onMouseEnter={() => setActiveCardId?.(offer.id)}
      onMouseLeave={() => setActiveCardId?.('')}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
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
      <div className={classNames({ 'favorites-card__info': isPathFavorites }, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: formatRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
