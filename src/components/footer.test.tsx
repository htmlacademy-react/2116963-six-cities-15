import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../mock/mock-component';

describe('Component: Footer', () => {
  it('should render correct', () => {
    const logoImageAlt = '6 cities logo';

    render(withHistory(<Footer />));

    const logoImage = screen.getByAltText(logoImageAlt);

    expect(logoImage).toBeInTheDocument();
  });
});
