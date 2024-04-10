import { render, screen } from '@testing-library/react';
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
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  //TODO
  // it('should render correctly when user enters text and rating', async () => {
  //   const offerId = makeFakeOffer().id;
  //   const text = 'test text';

  //   const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore());
  //   const preparedComponent = withHistory(withStoreComponent);

  //   render(preparedComponent);

  //   const textarea = screen.getByRole('textbox');
  //   const ratingStar = screen.getAllByRole('radio')[2];

  //   await userEvent.type(
  //     textarea,
  //     text,
  //   );
  //   await userEvent.click(ratingStar);

  //   expect(screen.getByDisplayValue(text)).toBeInTheDocument();
  //   expect(ratingStar).toBeChecked();
  //   expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  // });
});
