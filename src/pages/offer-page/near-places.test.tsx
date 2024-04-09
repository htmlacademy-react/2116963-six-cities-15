import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-component';
import NearPlaces from './near-places';

describe('Component: NearPlaces', () => {
  it('should render correct', () => {
    const nearOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const withHistoryComponent = withHistory(<NearPlaces offers={nearOffers} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(nearOffers.length);
  });
});
