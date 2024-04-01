import classNames from 'classnames';
import { FavoriteStatus } from '../types/favorites';
import { useState } from 'react';
import { useActionCreators } from '../hooks/state';
import { favoritesActions } from '../store/slices/favorites';

type BookmarkButtonProps = {
  classStart: string;
  width: number;
  height: number;
  offerId: string;
  isFavorite: boolean;
}

function BookmarkButton({ classStart, width, height, offerId, isFavorite }: BookmarkButtonProps) {
  const [isActive, setIsActive] = useState(isFavorite);
  const { postFavorite } = useActionCreators(favoritesActions);

  function handleClick() {
    setIsActive((prev) => !prev);
    const favoriteStatus: FavoriteStatus = { offerId, status: !isActive };
    postFavorite(favoriteStatus);
  }

  return (
    <button className={classNames(
      `${classStart}__bookmark-button button`,
      { [`${classStart}__bookmark-button--active`]: isActive }
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
