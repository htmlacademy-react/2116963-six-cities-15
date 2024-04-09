import { render, screen } from '@testing-library/react';
import { makeFakeFullOffer, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-component';
import OfferContainer from './offer-container';

describe('Component: OfferContainer', () => {
  it('should render correct', () => {
    const offer = makeFakeFullOffer();
    const withHistoryComponent = withHistory(<OfferContainer offer={offer} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    if (offer.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }
    if (offer.goods.length) {
      expect(screen.getByText('What’s inside')).toBeInTheDocument();
    }
  });
});
