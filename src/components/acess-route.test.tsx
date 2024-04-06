import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { withHistory, withStore } from '../mock/mock-component';
import { PrivateRoute, PublicRoute } from './access-route';
import { makeFakeStore, makeFakeUser } from '../mock/mock';

describe('Component: Access-Route', () => {
  let mockHistory: MemoryHistory;
  const route = '/route';

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(route);
  });

  describe('PrivateRoute', () => {
    it('should redirect, when user not authorized', () => {
      const expectedText = 'redirect';
      const notExpectedText = 'route';
      const preparedComponent = withHistory(
        <Routes>
          <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
          <Route path={route} element={
            <PrivateRoute >
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory
      );
      const { withStoreComponent } = withStore(preparedComponent, makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null
        },
      }));

      render(withStoreComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });

    it('should render component for private route, when user authorized', () => {
      const expectedText = 'route';
      const notExpectedText = 'redirect';
      const preparedComponent = withHistory(
        <Routes>
          <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
          <Route path={route} element={
            <PrivateRoute >
              <span>{expectedText}</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory
      );
      const { withStoreComponent } = withStore(preparedComponent, makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: makeFakeUser()
        },
      }));

      render(withStoreComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });
  });

  describe('PublicRoute', () => {
    it('should redirect, when user authorized', () => {
      const expectedText = 'redirect';
      const notExpectedText = 'route';
      const preparedComponent = withHistory(
        <Routes>
          <Route path={AppRoute.RootCity} element={<span>{expectedText}</span>} />
          <Route path={route} element={
            <PublicRoute >
              <span>{notExpectedText}</span>
            </PublicRoute>
          }
          />
        </Routes>,
        mockHistory
      );
      const { withStoreComponent } = withStore(preparedComponent, makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: makeFakeUser()
        },
      }));

      render(withStoreComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });

    it('should render component for public route, when user not authorized', () => {
      const expectedText = 'route';
      const notExpectedText = 'redirect';
      const preparedComponent = withHistory(
        <Routes>
          <Route path={AppRoute.RootCity} element={<span>{notExpectedText}</span>} />
          <Route path={route} element={
            <PublicRoute >
              <span>{expectedText}</span>
            </PublicRoute>
          }
          />
        </Routes>,
        mockHistory
      );
      const { withStoreComponent } = withStore(preparedComponent, makeFakeStore({
        user: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null
        },
      }));

      render(withStoreComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });
  });
});
