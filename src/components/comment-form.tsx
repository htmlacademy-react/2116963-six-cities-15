import { useState } from 'react';
import React from 'react';

const STARS_NUMBER = 5;
const STAR_TITLES = ['terribly', 'badly', 'not bad', 'good', 'perfect'] as const;
const TEXT_LENGTH = 50;

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState({ rating: 0, review: '' });

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  function disableSubmit() {
    return formData.review.length <= TEXT_LENGTH || formData.rating === 0;
  }

  function renderStars() {
    const stars: JSX.Element[] = [];
    for (let i = STARS_NUMBER; i > 0; i--) {
      stars.push(
        <React.Fragment key={`star-${i}`}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={i}
            id={`${i}-stars`}
            type="radio"
            onChange={handleFieldChange}
            defaultChecked={formData.rating === i}
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

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {renderStars()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with
          at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disableSubmit()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
