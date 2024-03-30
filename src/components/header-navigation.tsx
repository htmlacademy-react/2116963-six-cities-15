import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { userActions, userSelectors } from '../store/slices/user';

type HeaderNavigationProps = {
  currentPath: string;
}

function HeaderNavigation_({ currentPath }: HeaderNavigationProps): JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const { logout } = useActionCreators(userActions);
  const userData = useAppSelector(userSelectors.userData);

  const handleLogOut = () => {
    logout();
  };

  return (
    <nav className="header__nav">

      {authorizationStatus === AuthorizationStatus.Auth ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img src={userData?.avatarUrl} alt="avatar" width={20} height={20} style={{borderRadius: '50%'}}/>
              </div>
              <span className="header__user-name user__name">
                {userData?.email}
              </span>
              <span className="header__favorite-count">0</span>
            </Link>
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
