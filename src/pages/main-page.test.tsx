import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, CITIES, RequestStatus } from '../const';
import { makeFakeOffer, makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import MainPage from './main-page';
import { Offer } from '../types/offer';

describe('Main Page', () => {
  it('should render "MainPage"', () => {
    const withHistoryComponent = withHistory(<MainPage cityName={CITIES[0].name} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    CITIES.forEach(((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    }));
  });

  it('should render correctly with offers', () => {
    const offers: Offer[] = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const cityName = offers[0].city.name;

    const withHistoryComponent = withHistory(<MainPage cityName={cityName} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: offers,
        activeId: '',
        status: RequestStatus.Succeeded
      },
    }));

    render(withStoreComponent);

    const cityOffers = offers.filter((offer) => offer.city.name !== cityName);
    cityOffers.forEach((offer) => {
      expect(screen.queryByText(offer.title)).not.toBeInTheDocument();
    });
  });

  it('should change city on city link click', async () => {
    const activeCity = CITIES[1];

    const mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.RootCity);
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.RootCity} element={<MainPage cityName={CITIES[0].name} />} />
        <Route path={`/${activeCity.slug}`} element={<MainPage cityName={activeCity.name} />} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('link', { name: activeCity.name }));
    expect(screen.getByText(activeCity.name).closest('.tabs__item')).toHaveClass('tabs__item--active');
  });
});
