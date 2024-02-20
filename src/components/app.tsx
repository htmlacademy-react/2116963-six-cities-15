import MainPage from '../pages/main-page';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import NotFoundPage from '../pages/not-found-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import PrivateRoute from './private-route';

type AppProps = {
  placesCount: number;
}

function App({ placesCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage placesCount={placesCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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
    </BrowserRouter >
  );
}

export default App;
