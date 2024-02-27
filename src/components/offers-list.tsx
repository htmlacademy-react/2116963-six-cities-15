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

  const isPathRoot = useLocation().pathname === AppRoute.Root;

  return (
    <div className={classNames('places__list',
      { 'near-places__list': !isPathRoot, 'cities__places-list': isPathRoot, 'tabs__content': isPathRoot })}
    >
      {offers.map((offer: Offer) => <Card key={offer.id} offer={offer} setActiveCardId={setActiveCardId} />)}
    </div>
  );
}

export default OffersList;
