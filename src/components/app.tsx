import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, CITIES } from '../const';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import OfferPage from '../pages/offer-page/offer-page';
import { PrivateRoute, PublicRoute } from './access-route';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Navigate to={AppRoute.RootCity} />}
        />
        {CITIES.map((city) => (
          <Route
            key={city.slug}
            path={`/${city.slug}`}
            element={<MainPage cityName={city.name} />}
          />
        ))}
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider >
  );
}

export default App;
