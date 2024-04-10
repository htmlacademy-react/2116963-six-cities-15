import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../mock/mock-component';
import { makeFakeFullOffer, makeFakeOffer, makeFakeStore, makeFakeUser } from '../mock/mock';
import { AppRoute, AuthorizationStatus, CITIES, RequestStatus } from '../const';

describe('Application Routing', () => {
  const scrollToMock = vi.fn();
  window.scrollTo = scrollToMock;
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: [makeFakeOffer()],
        activeId: '',
        status: RequestStatus.Succeeded
      }
    }));
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    CITIES.forEach(((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    }));
  });

  it('should render "Login" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser(),
      },
      favorites: {
        favorites: [makeFakeOffer()],
        status: RequestStatus.Succeeded
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "Offer page" when user navigate to "/offer/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const offer = makeFakeFullOffer();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offer: {
        offer: offer,
        nearOffers: [],
        status: RequestStatus.Succeeded
      }
    }));
    mockHistory.push(`/offer/${offer.id}`);

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to homepage')).toBeInTheDocument();
  });
});
