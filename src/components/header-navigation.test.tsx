import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { extractActionsTypes, makeFakeStore, makeFakeUser } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import { fetchFavorites } from '../store/thunks/favorites';
import { logout } from '../store/thunks/user';
import HeaderNavigation from './header-navigation';

describe('Component: HeaderNavigation', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Root);
  });

  it('should render correct when not authorized and redirect to login on click', async () => {
    const expectedText = 'redirect';

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<HeaderNavigation currentPath={AppRoute.Root} />} />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
    }));

    render(withStoreComponent);

    const signLink = screen.getByText('Sign in');
    expect(signLink).toBeInTheDocument();

    await userEvent.click(signLink);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correct when authorized and logout on click', async () => {
    const expectedText = 'redirect';

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<HeaderNavigation currentPath={AppRoute.Root} />} />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(componentWithHistory, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser()
      },
    }));

    render(withStoreComponent);

    const signLink = screen.getByText('Sign out');
    expect(signLink).toBeInTheDocument();

    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

    await userEvent.click(signLink);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchFavorites.pending.type,
      fetchFavorites.rejected.type,
      logout.pending.type,
      logout.fulfilled.type,
    ]);
  });
});
