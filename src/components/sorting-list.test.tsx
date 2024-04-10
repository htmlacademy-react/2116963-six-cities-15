import { render, screen } from '@testing-library/react';
import { CITIES } from '../const';
import { makeFakeOffer, makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import SortingList from './sorting-list';

describe('Component: SortingList', () => {
  it('should render correctly', () => {
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const cityName = CITIES[0].name;

    const componentWithHistory = withHistory(<SortingList offers={offers} cityName={cityName} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(`${offers.length} place${offers.length > 1 && 's'} to stay in ${cityName}`)).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
