import { render, screen } from '@testing-library/react';
import { makeFakeFullOffer, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-component';
import Host from './host';

describe('Component: Host', () => {
  it('should render correct', () => {
    const offer = makeFakeFullOffer();
    const withHistoryComponent = withHistory(<Host offer={offer} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(offer.host.name)).toBeInTheDocument();
    expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
    if (offer.host.isPro) {
      expect(screen.getByText('Pro')).toBeInTheDocument();
    }
    expect(screen.getByText(offer.description)).toBeInTheDocument();
  });
});
