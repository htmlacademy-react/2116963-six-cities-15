import MainPage from '../pages/main-page';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus, CITIES } from '../const';
import NotFoundPage from '../pages/not-found-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import PrivateRoute from './private-route';
import type { Offer } from '../types/offer';
import ScrollToTop from './scroll-to-top';

type AppProps = {
  offers: Offer[];
}

function App({ offers }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Navigate to={AppRoute.RootCity} />}
          />
          {CITIES.map((city) => (
            <Route
              key={city.slug}
              path={`/${city.slug}`}
              element={<MainPage offers={offers} cityName={city.name} />}
            />
          ))}
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage offers={offers} />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter >
    </HelmetProvider>
  );
}

export default App;
