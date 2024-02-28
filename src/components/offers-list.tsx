import { useLocation } from 'react-router-dom';
import type { Offer } from '../types/offer';
import Card from './card';
import classNames from 'classnames';
import { AppRoute } from '../const';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState('');
  //TODO 'activeCardId' is assigned a value but never used.
  (()=>activeCardId)();

  const isPathRoot = useLocation().pathname === AppRoute.Root;

  return (
    <section className={classNames({ 'cities__places': isPathRoot, 'near-places': !isPathRoot }, 'places')}>
      {isPathRoot ?
        <>
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
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
        </> :
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>}
      <div className={classNames('places__list',
        { 'near-places__list': !isPathRoot, 'cities__places-list': isPathRoot, 'tabs__content': isPathRoot })}
      >
        {offers.map((offer: Offer) => <Card key={offer.id} offer={offer} setActiveCardId={setActiveCardId} />)}
      </div>
    </section>
  );
}

export default OffersList;
