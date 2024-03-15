import type { CityName, Offer } from '../types/offer';
import Card from './card';
import Map from './map';
import { useEffect } from 'react';
import EmptyList from './empty-list';
import classNames from 'classnames';
import { useActionCreators } from '../hooks/state';
import { offersActions } from '../store/slices/offers';

type OffersListProps = {
  offers: Offer[];
  cityName: CityName;
}

function OffersList({ offers, cityName }: OffersListProps): JSX.Element {
  const { setActiveId } = useActionCreators(offersActions);

  useEffect(() => () => {
    setActiveId('');
  });

  return (
    <div className="cities">
      <div className={classNames('cities__places-container container', { 'cities__places-container--empty': !offers.length })}>
        {offers.length ?
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} place{offers.length > 1 && 's'} to stay in {cityName}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom">
                <li className="places__option places__option--active" tabIndex={0} >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              {offers.map((offer: Offer) => <Card classStart='cities' offer={offer} setActiveId={setActiveId} key={offer.id} />)}
            </div>
          </section> :
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
