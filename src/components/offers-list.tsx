import type { CityName, Offer } from '../types/offer';
import Card from './card';
import Map from './map';
import { useState } from 'react';
import EmptyList from './empty-list';

type OffersListProps = {
  offers: Offer[];
  cityName: CityName;
}

function OffersList({ offers, cityName }: OffersListProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState('');

  return (
    <div className="cities">
      <div className="cities__places-container container">
        {offers.length ?
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {cityName}</b>
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
              {offers.map((offer: Offer) => <Card classStart='cities' offer={offer} setActiveCardId={setActiveCardId} key={offer.id} />)}
            </div>
          </section> :
          <section className="cities__no-places">
            <EmptyList classStart='cities' />
          </section>}
        <div className="cities__right-section">
          {Boolean(offers.length) && <Map className="cities__map" city={offers[0].city} offers={offers} activeCardId={activeCardId} />}
        </div>
      </div>
    </div>
  );
}

export default OffersList;
