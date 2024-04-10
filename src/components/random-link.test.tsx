import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { CITIES } from '../const';
import { makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import RandomLink from './random-link';

describe('Component: RandomLink', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    const componentWithHistory = withHistory(<RandomLink />);

    render(componentWithHistory);

    const generatedCity = screen.getByRole('link').textContent;

    const result = CITIES.some((city) => city.name === generatedCity);

    expect(result).toBe(true);
  });

  it('should redirect to main when click on link', async () => {
    const currentPath = '/route';
    mockHistory.push(currentPath);

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={currentPath} element={<RandomLink />} />
        {CITIES.map((city) => (
          <Route
            key={city.slug}
            path={`/${city.slug}`}
            element={<span>{`Page ${city.name}`}</span>}
          />
        ))}
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    const generatedCity = screen.getByRole('link').textContent;

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(`Page ${generatedCity}`)).toBeInTheDocument();
  });
});
