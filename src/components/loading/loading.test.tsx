import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correct', () => {
    const expectedText = 'Loading ...';

    render(<Loading />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
