import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeFakeOffer, makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import ReviewForm from './review-form';

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const offerId = makeFakeOffer().id;

    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
  });

  it('should render correctly when user enters text and rating', async () => {
    const offerId = makeFakeOffer().id;
    const text = 'test text';

    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const textarea = screen.getByRole('textbox');
    const ratingStar = screen.getAllByRole('radio');

    await userEvent.type(
      textarea,
      text,
    );
    await userEvent.click(ratingStar[2]);

    expect(screen.getByDisplayValue(text)).toBeInTheDocument();
    expect(ratingStar[2]).toBeChecked();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });
});
