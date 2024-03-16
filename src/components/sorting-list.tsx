import { useEffect, useState } from 'react';
import { SORTING_OPTIONS } from '../const';
import { useActionCreators } from '../hooks/state';
import { offersActions } from '../store/slices/offers';
import type { CityName, Offer } from '../types/offer';
import { SortingOption } from '../types/sorting';
import Card from './card';
import Sorting from './sorting';

type SortingListProps = {
  offers: Offer[];
  cityName: CityName;
}

function SortingList({ offers, cityName }: SortingListProps) {
  const { setActiveId } = useActionCreators(offersActions);
  const [currentOption, setCurrentOption] = useState<SortingOption>(SORTING_OPTIONS[0]);

  useEffect(() => () => {
    setActiveId('');
  });

  useEffect(() => {
    setCurrentOption(SORTING_OPTIONS[0]);
  }, [cityName]);

  let sortedOffers: Offer[];

  if (currentOption === SORTING_OPTIONS[0]) {
    sortedOffers = offers;
  } else {
    sortedOffers = [...offers].sort(currentOption.compare);
  }

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} place{offers.length > 1 && 's'} to stay in {cityName}</b>
      <Sorting currentOption={currentOption} setCurrentOption={setCurrentOption} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer: Offer) => <Card classStart='cities' offer={offer} setActiveId={setActiveId} key={offer.id} />)}
      </div>
    </section>
  );
}

export default SortingList;
