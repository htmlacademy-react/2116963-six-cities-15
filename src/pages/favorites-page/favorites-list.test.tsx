import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../const';
import { makeFakeOffer, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-component';
import FavoritesList from './favorites-list';


describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const favorites = [makeFakeOffer(true), makeFakeOffer(true)];
    const componentWithHistory = withHistory(<FavoritesList offers={favorites} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      favorites: {
        favorites: favorites,
        status: RequestStatus.Succeeded
      },
    }));

    render(withStoreComponent);

    expect(screen.getAllByRole('article')).toHaveLength(favorites.length);
    favorites.forEach((offer) => {
      expect(screen.getByText(offer.city.name)).toBeInTheDocument();
    });
  });
});
