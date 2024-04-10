import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../const';
import { makeFakeOffer, makeFakeStore, makeFakeUser } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import HeaderProfile from './header-profile';

describe('Component: HeaderProfile', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    const favorites = [makeFakeOffer(true), makeFakeOffer(true)];
    const userData = makeFakeUser();

    const componentWithHistory = withHistory(<HeaderProfile />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: userData
      },
      favorites: {
        favorites: favorites,
        status: RequestStatus.Succeeded
      },
    }));

    render(withStoreComponent);

    if (userData) {
      expect(screen.getByRole('img')).toHaveAttribute('src', userData.avatarUrl);
      expect(screen.getByText(userData.email)).toBeInTheDocument();
      expect(screen.getByText(favorites.length)).toBeInTheDocument();
    }
  });

  it('should direct to favorites page on click', async () => {
    const expectedText = 'redirect';

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<HeaderProfile />} />
        <Route path={AppRoute.Favorites} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser()
      },
    }));

    render(withStoreComponent);

    const link = screen.getByRole('link');

    await userEvent.click(link);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
