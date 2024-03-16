import classNames from 'classnames';
import type { CityName, Offer } from '../types/offer';
import EmptyList from './empty-list';
import Map from './map';
import SortingList from './sorting-list';

type OffersListProps = {
  offers: Offer[];
  cityName: CityName;
}

function OffersList({ offers, cityName }: OffersListProps): JSX.Element {
  return (
    <div className="cities">
      <div className={classNames('cities__places-container container', { 'cities__places-container--empty': !offers.length })}>
        {offers.length ?
          <SortingList offers={offers} cityName={cityName} /> :
          <section className="cities__no-places">
            <EmptyList classStart='cities' cityName={cityName} />
          </section>}
        <div className="cities__right-section">
          {Boolean(offers.length) && <Map className="cities__map" city={offers[0].city} offers={offers} />}
        </div>
      </div>
    </div>
  );
}

export default OffersList;
