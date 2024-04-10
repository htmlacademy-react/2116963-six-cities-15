import { render } from '@testing-library/react';
import { RequestStatus } from '../const';
import { generateCityOffer, makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const className = 'test-class';

    const offers = [generateCityOffer(), generateCityOffer(), generateCityOffer()];
    const city = offers[0].city;

    const componentWithHistory = withHistory(<Map className={className} city={city} offers={offers} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      offers: {
        offers: offers,
        activeId: '',
        status: RequestStatus.Succeeded
      },
    }));

    const { container } = render(withStoreComponent);

    expect(container.querySelector('.map')).toBeInTheDocument();
    expect(container.querySelectorAll('img[src="/img/pin.svg"]')).toHaveLength(offers.length);
  });

  it('should render correctly when activeId', () => {
    const className = 'test-class';

    const offers = [generateCityOffer(), generateCityOffer(), generateCityOffer()];
    const activeId = offers[0].id;
    const city = offers[0].city;

    const componentWithHistory = withHistory(<Map className={className} city={city} offers={offers} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      offers: {
        offers: offers,
        activeId: activeId,
        status: RequestStatus.Succeeded
      },
    }));

    const { container } = render(withStoreComponent);

    expect(container.querySelector('.map')).toBeInTheDocument();
    expect(container.querySelectorAll('img[src="/img/pin.svg"]')).toHaveLength(offers.length - 1);
    expect(container.querySelectorAll('img[src="/img/pin-active.svg"]')).toHaveLength(1);
  });
});
