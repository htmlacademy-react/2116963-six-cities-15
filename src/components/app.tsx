import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../const';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import { PrivateRoute, PublicRoute } from './access-route';
import { useAppSelector } from '../hooks/state';
import { userSelectors } from '../store/slices/user';
import Loading from './loading/loading';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <Loading />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
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
              <PublicRoute authorizationStatus={authorizationStatus}>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          {
          //TODO
          /* <Route
            path={AppRoute.Offer}
            element={<OfferPage />}
          /> */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter >
    </HelmetProvider >
  );
}

export default App;
