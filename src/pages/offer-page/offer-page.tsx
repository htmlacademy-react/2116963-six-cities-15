import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import Loading from '../../components/loading/loading';
import Map from '../../components/map';
import { RequestStatus } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/state';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { offerActions, offerSelectors } from '../../store/slices/offer';
import { FullOffer } from '../../types/offer';
import { getNearOffers } from '../../utils';
import NotFoundPage from '../not-found-page';
import Gallery from './gallery';
import NearPlaces from './near-places';
import OfferContainer from './offer-container';

const IMAGES_LIMIT = 6;
const NEAR_OFFERS_LIMIT = 3;

function OfferPage(): JSX.Element {
  useScrollToTop();
  const { id: offerId } = useParams() as { id: string };
  const { fetchOffer, fetchNearOffers, clear } = useActionCreators(offerActions);
  const status = useAppSelector(offerSelectors.status);
  const offer = useAppSelector(offerSelectors.offer) as FullOffer;
  const allNearOffers = useAppSelector(offerSelectors.nearOffers);
  const nearOffers = useMemo(() => getNearOffers(allNearOffers, offerId, NEAR_OFFERS_LIMIT), [allNearOffers, offerId]);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchOffer(offerId);
      fetchNearOffers(offerId);
    }
  }, [offerId, status, fetchOffer, fetchNearOffers]);

  useEffect(() => () => {
    clear();
  }, [offerId, clear]);


  if (status === RequestStatus.Idle || status === RequestStatus.Loading) {
    return <Loading />;
  }

  if (status === RequestStatus.Failed) {
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
          <OfferContainer offer={offer} offerId={offerId} />
          <Map className="offer__map" offers={nearOffers} city={offer.city} currentOffer={offer} />
        </section>
        {Boolean(nearOffers.length) && <NearPlaces offers={nearOffers} />}
      </main>
    </div>
  );
}

export default OfferPage;
