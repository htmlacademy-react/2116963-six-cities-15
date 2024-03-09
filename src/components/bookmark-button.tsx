type BookmarkButtonProps = {
  classStart: string;
  width: number;
  height: number;
}

function BookmarkButton({ classStart, width, height }: BookmarkButtonProps) {
  return (
    <button className={`${classStart}__bookmark-button button`} type="button">
      <svg className={`${classStart}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
