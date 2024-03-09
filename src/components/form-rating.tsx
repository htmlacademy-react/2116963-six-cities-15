import React from 'react';

const RATING_VALUES = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

function FormRating(): JSX.Element[] {
  return RATING_VALUES.map((item) => {
    const { value, title } = item;
    return (
      <React.Fragment key={`star-${title}`}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={value}
          id={`${value}-stars`}
          type="radio"
        />
        <label
          htmlFor={`${value}-stars`}
          className="reviews__rating-label form__rating-label"
          title={title}
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </React.Fragment>
    );
  });
}

export default FormRating;
