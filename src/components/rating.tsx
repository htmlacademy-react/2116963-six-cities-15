import React from 'react';

const STAR_TITLES = ['terribly', 'badly', 'not bad', 'good', 'perfect'] as const;

function Rating(): JSX.Element[] {
  const stars: JSX.Element[] = [];
  for (let i = STAR_TITLES.length; i > 0; i--) {
    stars.push(
      <React.Fragment key={`star-${i}`}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={i}
          id={`${i}-stars`}
          type="radio"
        />
        <label
          htmlFor={`${i}-stars`}
          className="reviews__rating-label form__rating-label"
          title={STAR_TITLES[i - 1]}
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </React.Fragment>
    );
  }
  return stars;
}

export default Rating;
