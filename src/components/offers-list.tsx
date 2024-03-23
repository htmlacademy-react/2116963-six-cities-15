import classNames from 'classnames';
import type { CityName, Offer } from '../types/offer';
import EmptyList from './empty-list';
import Map from './map';
import SortingList from './sorting-list';
import Loading from './loading/loading';
import { useAppSelector } from '../hooks/state';
import { offersSelectors } from '../store/slices/offers';
import { RequestStatus } from '../const';

type OffersListProps = {
  offers: Offer[];
  cityName: CityName;
}

function OffersList({ offers, cityName }: OffersListProps): JSX.Element {
  const status = useAppSelector(offersSelectors.status);
  const areOffersLoading = status === RequestStatus.Loading;
  const hasOffers = Boolean(offers.length);


  const showLoading = areOffersLoading && !hasOffers;
  const showEmpty = !areOffersLoading && !hasOffers;
  const showOffers = !areOffersLoading && hasOffers;

  return (
    <div className="cities">
      <div className={classNames('cities__places-container container', { 'cities__places-container--empty': !hasOffers })}>
        {showLoading &&
          <section className="cities__no-places">
            {<Loading />}
          </section>}
        {showEmpty &&
          <section className="cities__no-places">
            {<EmptyList classStart='cities' cityName={cityName} />}
          </section>}
        {showOffers && <SortingList offers={offers} cityName={cityName} />}
        <div className="cities__right-section">
          {Boolean(hasOffers) && <Map className="cities__map" city={offers[0].city} offers={offers} />}
        </div>
      </div>
    </div>
  );
}

export default OffersList;
