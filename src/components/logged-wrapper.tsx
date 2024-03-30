import { memo } from 'react';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks/state';
import { userSelectors } from '../store/slices/user';

type LoggedWrapperProps = {
  children: JSX.Element;
}

// eslint-disable-next-line prefer-arrow-callback
const LoggedWrapper = memo(function LoggedWrapper({children}: LoggedWrapperProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const isLogged = authorizationStatus === AuthorizationStatus.Auth;
  return isLogged ? children : null;
});

export default LoggedWrapper;
