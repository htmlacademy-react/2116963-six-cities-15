import { Offer } from '../../types/offer';
import Card from '../../components/card';

type NearPlacesProps = {
  offers: Offer[];
}

function NearPlaces({ offers }: NearPlacesProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {offers.map((offer) => <Card classStart='near-places' offer={offer} key={offer.id} />)}
        </div>
      </section>
    </div>
  );
}

export default NearPlaces;
