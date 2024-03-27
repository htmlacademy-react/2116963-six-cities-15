import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import BookmarkButton from '../../components/bookmark-button';
import Header from '../../components/header';
import Loading from '../../components/loading/loading';
import Map from '../../components/map';
import PremiumMark from '../../components/premium-mark';
import Price from '../../components/price';
import Rating from '../../components/rating';
import Reviews from '../../components/reviews';
import { RequestStatus } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/state';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { offerActions, offerSelectors } from '../../store/slices/offer';
import { FullOffer } from '../../types/offer';
import { getNearOffers } from '../../utils';
import NotFoundPage from '../not-found-page';
import Features from './features';
import Gallery from './gallery';
import Goods from './goods';
import Host from './host';
import NearPlaces from './near-places';

const IMAGES_LIMIT = 6;
const REVIEWS_LIMIT = 10;
const NEAR_OFFERS_LIMIT = 3;

function OfferPage(): JSX.Element {
  useScrollToTop();
  const { id } = useParams() as { id: string };
  const { fetchOffer, fetchNearOffers, clear } = useActionCreators(offerActions);
  const status = useAppSelector(offerSelectors.status);
  const offer = useAppSelector(offerSelectors.offer) as FullOffer;
  const allNearOffers = useAppSelector(offerSelectors.nearOffers);
  const nearOffers = getNearOffers(allNearOffers, id, NEAR_OFFERS_LIMIT);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchOffer(id);
      fetchNearOffers(id);
    }
  }, [id, status, fetchOffer, fetchNearOffers]);

  useEffect(() => () => {
    clear();
  }, [id, clear]);


  if (status === RequestStatus.Idle || status === RequestStatus.Loading) {
    return <Loading />;
  } else if (status === RequestStatus.Failed) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer.</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          {Boolean(offer.images.length) && <Gallery images={offer.images} imagesLimit={IMAGES_LIMIT} />}
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <PremiumMark className='offer__mark' />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <BookmarkButton classStart='offer' width={31} height={33} />
              </div>
              <Rating classStart='offer' rating={offer.rating} />
              <Features offer={offer} />
              <Price classStart='offer' price={offer.price} />
              {Boolean(offer.goods.length) && <Goods goods={offer.goods} />}
              <Host offer={offer} />
              <Reviews id={id} reviewsLimit={REVIEWS_LIMIT} />
            </div>
          </div>
          <Map className="offer__map" offers={nearOffers} city={offer.city} currentOffer={offer} />
        </section>
        {Boolean(nearOffers.length) && <NearPlaces offers={nearOffers} />}
      </main>
    </div>
  );
}

export default OfferPage;
