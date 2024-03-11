import { FullOffer } from '../../types/offer';

type FeaturesProps = {
  offer: FullOffer;
}

function Features({ offer }: FeaturesProps) {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire" style={{ textTransform: 'capitalize' }}>{offer.type}</li>
      {Boolean(offer.bedrooms) &&
        <li className="offer__feature offer__feature--bedrooms">
          {offer.bedrooms} Bedroom{offer.bedrooms > 1 && 's'}
        </li>}
      {Boolean(offer.maxAdults) &&
        <li className="offer__feature offer__feature--adults">
          Max {offer.maxAdults} adult{offer.maxAdults > 1 && 's'}
        </li>}
    </ul>
  );
}

export default Features;
