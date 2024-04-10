import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock/mock-component';
import { makeFakeOffer, makeFakeStore } from '../mock/mock';
import OffersList from './offers-list';
import { CITIES, RequestStatus } from '../const';
import { Offer } from '../types/offer';

describe('Component: OffersList', () => {
  it('should render correctly while loading offers', () => {
    const offers: Offer[] = [];
    const cityName = CITIES[0];

    const componentWithHistory = withHistory(<OffersList offers={offers} cityName={cityName.name} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      offers: {
        offers: offers,
        activeId: '',
        status: RequestStatus.Loading
      },
    }));

    const { container } = render(withStoreComponent);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(container.querySelector('.cities__places-container')).toHaveClass('cities__places-container--empty');
    expect(container.querySelector('.map')).not.toBeInTheDocument();
  });

  it('should render correctly with offers', () => {
    const offers: Offer[] = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    const cityName = offers[0].city.name;

    const componentWithHistory = withHistory(<OffersList offers={offers} cityName={cityName} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      offers: {
        offers: offers,
        activeId: '',
        status: RequestStatus.Succeeded
      },
    }));

    const { container } = render(withStoreComponent);

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(container.querySelector('.cities__places-container')).not.toHaveClass('cities__places-container--empty');
    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
    expect(container.querySelector('.map')).toBeInTheDocument();
  });

  it('should render correctly without offers', () => {
    const offers: Offer[] = [];
    const cityName = CITIES[0].name;

    const componentWithHistory = withHistory(<OffersList offers={offers} cityName={cityName} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      offers: {
        offers: offers,
        activeId: '',
        status: RequestStatus.Succeeded
      },
    }));

    const { container } = render(withStoreComponent);

    expect(container.querySelector('.cities__places-container')).toHaveClass('cities__places-container--empty');
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(container.querySelector('.map')).not.toBeInTheDocument();
  });
});
