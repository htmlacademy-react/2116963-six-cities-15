import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks/state';
import { userSelectors } from '../store/slices/user';
import Loading from './loading/loading';

type AccessRouteProps = {
  children: JSX.Element;
}

type AppRouteValue = typeof AppRoute[keyof typeof AppRoute];

const createAccessRoute = (status: AuthorizationStatus, fallback: AppRouteValue) =>
  function AccessRoute({ children }: AccessRouteProps) {
    const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);

    if (authorizationStatus === AuthorizationStatus.Unknown) {
      return (
        <Loading />
      );
    }

    return (
      authorizationStatus === status
        ? children
        : <Navigate to={fallback} />
    );
  };

const PrivateRoute = createAccessRoute(AuthorizationStatus.Auth, AppRoute.Login);
const PublicRoute = createAccessRoute(AuthorizationStatus.NoAuth, AppRoute.RootCity);

export { PrivateRoute, PublicRoute };
