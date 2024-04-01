import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { favoritesActions } from '../store/slices/favorites';
import { userSelectors } from '../store/slices/user';

type BookmarkButtonProps = {
  classStart: string;
  width: number;
  height: number;
  offerId: string;
  isFavorite: boolean;
}

function BookmarkButton({ classStart, width, height, offerId, isFavorite }: BookmarkButtonProps) {
  const [isActive, setIsActive] = useState(isFavorite);
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const { postFavorite } = useActionCreators(favoritesActions);
  const navigate = useNavigate();
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  function handleClick() {
    if (isAuthorized) {
      setIsActive((prev) => !prev);
      postFavorite({ offerId, isFavorite: !isActive });
    } else {
      navigate(AppRoute.Login);
    }
  }

  return (
    <button className={classNames(
      `${classStart}__bookmark-button button`,
      { [`${classStart}__bookmark-button--active`]: isActive && isAuthorized }
    )} type="button" onClick={handleClick}
    >
      <svg className={`${classStart}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
