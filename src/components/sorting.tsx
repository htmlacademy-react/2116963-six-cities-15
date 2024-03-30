import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { SORTING_OPTIONS } from '../const';
import { SortingOption } from '../types/sorting';

type SortingProps = {
  currentOption: SortingOption;
  setCurrentOption: React.Dispatch<React.SetStateAction<SortingOption>>;
}

// eslint-disable-next-line prefer-arrow-callback
const Sorting = memo(function Sorting({ currentOption, setCurrentOption }: SortingProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      const handleEsc = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          setIsOpened(false);
        }
      };

      const handleClickOutside = () => {
        setIsOpened(false);
      };

      document.addEventListener('keydown', handleEsc);
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpened]);

  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={(evt) => {
          evt.stopPropagation();
          setIsOpened((prevState) => !prevState);
        }}
      >
        {currentOption.text}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', { 'places__options--opened': isOpened })}>
        {SORTING_OPTIONS.map((option) => (
          <li className={classNames('places__option', { 'places__option--active': option === currentOption })}
            tabIndex={0}
            onClick={() => {
              if (option !== currentOption) {
                setCurrentOption(option);
              }
            }}
            key={option.text}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </form >
  );
});

export default Sorting;
