import { useState } from 'react';
import Rating from './rating';

const TEXT_MIN_LENGTH = 50;
const TEXT_MAX_LENGTH = 300;

type Form = HTMLFormElement & {
  rating: RadioNodeList;
  review: HTMLTextAreaElement;
}

function CommentForm(): JSX.Element {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  function handleFormChange(evt: React.FormEvent<HTMLFormElement>) {
    const form = evt.currentTarget as Form;
    const rating = form.rating.value;
    const review = form.review.value;
    setSubmitDisabled(review.length <= TEXT_MIN_LENGTH || !rating);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <Rating />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength={TEXT_MAX_LENGTH}
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
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
