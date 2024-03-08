import Header from '../components/header';
import { Helmet } from 'react-helmet-async';
import type { Offer, FullOffer } from '../types/offer';
import { useParams } from 'react-router-dom';
import { fullOffers } from '../mocks/full-offers';
import { reviews as allReviews } from '../mocks/reviews';
import CommentForm from '../components/comment-form';
import { formatRating, compareReviewDates, getNearOffers } from '../utils';
import Card from '../components/card';
import ReviewsItem from '../components/review-item';
import Map from '../components/map';

type OfferPageProps = {
  offers: Offer[];
};

const IMAGES_LIMIT = 6;
const NEAR_OFFERS_LIMIT = 3;

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const currentOffer = fullOffers.find((offer) => offer.id === id) as FullOffer;
  const nearOffers = getNearOffers(offers, id, currentOffer.city.name, NEAR_OFFERS_LIMIT);
  const reviews = allReviews.filter((review) => review.id === id);

  function renderImages() {
    const imagesElements: JSX.Element[] = [];
    for (let i = 0; i < Math.min(IMAGES_LIMIT, currentOffer.images.length); i++) {
      imagesElements.push(
        <div key={`image-${i}`} className="offer__image-wrapper">
          <img
            className="offer__image"
            src={currentOffer.images[i]}
            alt="Photo studio"
          />
        </div>
      );
    }
    return imagesElements;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer.</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {renderImages()}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: formatRating(currentOffer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire" style={{ textTransform: 'capitalize' }}>{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&rsquo;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {reviews
                    .sort(compareReviewDates)
                    .map((review) => <ReviewsItem key={review.date} review={review} />)}
                </ul>
                <CommentForm />
              </section>
            </div>
          </div>
          <Map className="offer__map" offers={nearOffers} city={currentOffer.city} currentOffer={currentOffer} />
        </section>
        {Boolean(nearOffers.length) &&
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearOffers.map((offer: Offer) => <Card key={offer.id} offer={offer} />)}
              </div>
            </section>
          </div>}
      </main>
    </div>
  );
}

export default OfferPage;
