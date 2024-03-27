import { useRef, useState } from 'react';
import FormRating from './form-rating';
import { reviewsActions } from '../store/slices/reviews';
import { ReviewToSent } from '../types/review';
import { useActionCreators } from '../hooks/state';

const TEXT_MIN_LENGTH = 50;
const TEXT_MAX_LENGTH = 300;

type Form = HTMLFormElement & {
  rating: RadioNodeList;
  review: HTMLTextAreaElement;
}

function CommentForm({ id }: { id: string }): JSX.Element {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const formRef = useRef(null);
  const { postReview } = useActionCreators(reviewsActions);

  function handleFormChange(evt: React.FormEvent<HTMLFormElement>) {
    const form = evt.currentTarget as Form;
    const rating = form.rating.value;
    const review = form.review.value;
    setSubmitDisabled(review.length <= TEXT_MIN_LENGTH || !rating);
  }

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget as Form;
    const reviewToSent: ReviewToSent = {
      offerId: id,
      reviewInfo: {
        comment: form.review.value,
        rating: +form.rating.value
      },
      clearForm: () => {
        form.review.value = '';
        const stars: NodeListOf<HTMLInputElement> = form.querySelectorAll('input[type="radio"]');
        stars.forEach((star) => {
          star.checked = false;
        });
      }
    };
    postReview(reviewToSent);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange} onSubmit={handleFormSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <FormRating />
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
