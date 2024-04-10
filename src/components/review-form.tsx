import { memo, useRef, useState } from 'react';
import FormRating from './form-rating';
import { reviewsActions } from '../store/slices/reviews';
import { ReviewToSend } from '../types/review';
import { useActionCreators } from '../hooks/state';
import { toast } from 'react-toastify';


const TextLength = {
  Min: 50,
  Max: 300
} as const;

type ReviewFormProps = {
  offerId: string;
}

type ReviewForm = HTMLFormElement & {
  rating: RadioNodeList;
  review: HTMLTextAreaElement;
}

function ReviewForm_({ offerId }: ReviewFormProps): JSX.Element {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const formRef = useRef(null);
  const { postReview } = useActionCreators(reviewsActions);
  const [isDisabled, setDisabled] = useState(false);

  function handleFormChange(evt: React.FormEvent<ReviewForm>) {
    const form = evt.currentTarget;
    const rating = form.rating.value;
    const review = form.review.value;
    setSubmitDisabled(review.length < TextLength.Min || review.length > TextLength.Max || !rating);
  }

  function handleFormSubmit(evt: React.FormEvent<ReviewForm>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const reviewToSend: ReviewToSend = {
      offerId,
      reviewInfo: {
        comment: form.review.value,
        rating: Number(form.rating.value)
      },
    };
    setDisabled(true);
    toast.promise(postReview(reviewToSend).unwrap(), {
      pending: 'Sending review...',
      success: {
        render: () => {
          setDisabled(false);
          setSubmitDisabled(true);
          form.reset();
          return 'Review sent!';
        }
      },
      error: {
        render() {
          setDisabled(false);
          return 'Failed to send review. Please try again';
        }
      }
    });
  }

  return (
    <form className="reviews__form form"
      action="#"
      method="post"
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <FormRating isDisabled={isDisabled} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isDisabled}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with
          at least <b className="reviews__text-amount">{TextLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

const ReviewForm = memo(ReviewForm_);

export default ReviewForm;
