import { render, screen } from '@testing-library/react';
import PremiumMark from './premium-mark';

describe('Component: PremiumMark', () => {
  it('should render correctly', () => {
    const className = 'test-class';

    const component = <PremiumMark className={className} />;

    render(component);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Premium').parentElement).toHaveClass(className);
  });
});
