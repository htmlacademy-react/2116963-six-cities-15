import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, RequestStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { favoritesActions, favoritesSelectors } from '../store/slices/favorites';
import { userSelectors } from '../store/slices/user';

function HeaderProfile(): JSX.Element {
  const userData = useAppSelector(userSelectors.userData);
  const favoritesStatus = useAppSelector(favoritesSelectors.status);
  const favoritesLength = useAppSelector(favoritesSelectors.favoritesLength);
  const { fetchFavorites } = useActionCreators(favoritesActions);

  useEffect(() => {
    if (favoritesStatus === RequestStatus.Idle) {
      fetchFavorites();
    }
  }, [favoritesStatus, fetchFavorites]);

  return (
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
        <img src={userData?.avatarUrl} alt="avatar" width={20} height={20} style={{ borderRadius: '50%' }} />
      </div>
      <span className="header__user-name user__name">
        {userData?.email}
      </span>
      <span className="header__favorite-count">{favoritesLength}</span>
    </Link>
  );
}

export default HeaderProfile;
