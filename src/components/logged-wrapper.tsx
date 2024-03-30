import { memo } from 'react';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks/state';
import { userSelectors } from '../store/slices/user';

type LoggedWrapperProps = {
  children: JSX.Element;
}

function LoggedWrapper_({children}: LoggedWrapperProps): JSX.Element | null {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const isLogged = authorizationStatus === AuthorizationStatus.Auth;
  return isLogged ? children : null;
}

const LoggedWrapper = memo(LoggedWrapper_);

export default LoggedWrapper;
