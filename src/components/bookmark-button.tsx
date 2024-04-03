import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { useActionCreators, useAppSelector } from '../hooks/state';
import { favoritesActions } from '../store/slices/favorites';
import { userSelectors } from '../store/slices/user';
import { toast } from 'react-toastify';

type BookmarkButtonProps = {
  classStart: string;
  width: number;
  height: number;
  offerId: string;
  isFavorite: boolean;
}

function BookmarkButton({ classStart, width, height, offerId, isFavorite }: BookmarkButtonProps) {
  const [isActive, setIsActive] = useState(isFavorite);
  const [isDisabled, setIsDisabled] = useState(false);
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const { postFavorite } = useActionCreators(favoritesActions);
  const navigate = useNavigate();
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  function handleClick() {
    if (isAuthorized) {
      setIsDisabled(true);
      postFavorite({ offerId, isFavorite: !isActive })
        .unwrap()
        .then(() => {
          setIsActive((prev) => !prev);
          setIsDisabled(false);
        })
        .catch(() => {
          toast.error('Failed. Please try again');
          setIsDisabled(false);
        });
    } else {
      navigate(AppRoute.Login);
    }
  }

  return (
    <button className={classNames(
      `${classStart}__bookmark-button button`,
      { [`${classStart}__bookmark-button--active`]: isActive && isAuthorized }
    )} type="button" onClick={handleClick} disabled={isDisabled}
    >
      <svg className={`${classStart}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
