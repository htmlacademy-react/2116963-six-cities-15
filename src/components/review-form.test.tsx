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
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
