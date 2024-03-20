import classNames from 'classnames';
import type { CityName, Offer } from '../types/offer';
import EmptyList from './empty-list';
import Map from './map';
import SortingList from './sorting-list';
import Loading from './loading/loading';
import { useAppSelector } from '../hooks/state';
import { offersSelectors } from '../store/slices/offers';

type OffersListProps = {
  offers: Offer[];
  cityName: CityName;
}

function OffersList({ offers, cityName }: OffersListProps): JSX.Element {
  const areOffersLoading = useAppSelector(offersSelectors.areOffersLoading);
  const hasOffers = offers.length;

  return (
    <div className="cities">
      <div className={classNames('cities__places-container container', { 'cities__places-container--empty': !hasOffers })}>
        {hasOffers ?
          <SortingList offers={offers} cityName={cityName} /> :
          <section className="cities__no-places">
            {areOffersLoading ? <Loading /> : <EmptyList classStart='cities' cityName={cityName} />}
          </section>}
        <div className="cities__right-section">
          {Boolean(hasOffers) && <Map className="cities__map" city={offers[0].city} offers={offers} />}
        </div>
      </div>
    </div>
  );
}

export default OffersList;
