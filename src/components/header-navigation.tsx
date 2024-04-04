import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { userActions, userSelectors } from '../store/slices/user';
import HeaderProfile from './header-profile';

type HeaderNavigationProps = {
  currentPath: string;
}

function HeaderNavigation_({ currentPath }: HeaderNavigationProps): JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const { logout } = useActionCreators(userActions);

  const handleLogOut = () => {
    logout();
  };

  return (
    <nav className="header__nav">

      {authorizationStatus === AuthorizationStatus.Auth ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <HeaderProfile />
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to={currentPath} onClick={handleLogOut}>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul> :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

const HeaderNavigation = memo(HeaderNavigation_);

export default HeaderNavigation;
