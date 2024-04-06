import { render, screen } from '@testing-library/react';
import { CITIES } from '../const';
import EmptyList from './empty-list';

describe('Component: EmptyList', () => {
  it('should render correct with class cities', () => {
    const expectedTitle = 'No places to stay available';
    const expectedDescription = `We could not find any property available at the moment in ${CITIES[0].name}`;

    render(<EmptyList classStart='cities' cityName={CITIES[0].name} />);

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
  });

  it('should render correct with class favorites', () => {
    const expectedTitle = 'Nothing yet saved.';
    const expectedDescription = 'Save properties to narrow down search or plan your future trips.';

    render(<EmptyList classStart='favorites' />);

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
  });
});
