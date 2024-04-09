import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, CITIES } from '../const';
import { makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import MainPage from './main-page';

describe('Main Page', () => {
  it('should render "MainPage"', () => {
    const withHistoryComponent = withHistory(<MainPage cityName={CITIES[0].name}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    CITIES.forEach(((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    }));
  });

  it('should change city on city link click', async () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.RootCity);
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.RootCity} element={<MainPage cityName={CITIES[0].name} />} />
        <Route path={`/${CITIES[1].slug}`} element={<MainPage cityName={CITIES[1].name} />}/>
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('link', { name: CITIES[1].name }));
    expect(screen.getByText(CITIES[1].name).closest('.tabs__item')).toHaveClass('tabs__item--active');
  });
});
