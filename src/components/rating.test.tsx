import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correct with class offer', () => {
    const className = 'offer';
    const rating = 4;

    render(<Rating classStart={className} rating={rating} />);

    expect(screen.getByText(rating)).toBeInTheDocument();
  });
});
