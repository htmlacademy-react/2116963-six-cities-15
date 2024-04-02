import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card';
import type { CityName, Offer } from '../../types/offer';
import { makeLowerCaseFirstLetter } from '../../utils';

type FavoritesListProps = {
  offers: Offer[];
}

function FavoritesList({ offers }: FavoritesListProps) {
  const offersByCity = useMemo(() => Object.groupBy(offers, (offer) => offer.city.name), [offers]);
  const cities = Object.keys(offersByCity) as CityName[];
  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        const citySlug = makeLowerCaseFirstLetter(city);
        return (
          <li className="favorites__locations-items" key={citySlug}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={`/${citySlug}`}>
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {offersByCity[city]?.map((offer) => <Card classStart='favorites' offer={offer} key={offer.id} />)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default FavoritesList;
