import type { Offer } from '../types';
import Card from './card';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer: Offer) => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export default OffersList;
