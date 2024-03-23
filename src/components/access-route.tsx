import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';

type AccessRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

type AppRouteValue = typeof AppRoute[keyof typeof AppRoute];

const createAccessRoute = (status: AuthorizationStatus, fallback: AppRouteValue) =>
  function AccessRoute({ authorizationStatus, children }: AccessRouteProps) {
    return (
      authorizationStatus === status
        ? children
        : <Navigate to={fallback} />
    );
  };

const PrivateRoute = createAccessRoute(AuthorizationStatus.Auth, AppRoute.Login);
const PublicRoute = createAccessRoute(AuthorizationStatus.NoAuth, AppRoute.RootCity);

export { PrivateRoute, PublicRoute };
