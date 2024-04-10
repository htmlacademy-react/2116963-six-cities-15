import { render, screen } from '@testing-library/react';
import FavoritesPage from './favorites-page';
import { withHistory, withStore } from '../../mock/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../mock/mock';
import { RequestStatus } from '../../const';


describe('Component: FavoritesPage', () => {
  it('should render correctly when empty', () => {
    const componentWithHistory = withHistory(<FavoritesPage />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      favorites: {
        favorites: [],
        status: RequestStatus.Succeeded
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('should render correctly with favorites', () => {
    const favorites = [makeFakeOffer(true), makeFakeOffer(true)];

    const componentWithHistory = withHistory(<FavoritesPage />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      favorites: {
        favorites: favorites,
        status: RequestStatus.Succeeded
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(favorites.length);
  });
});
