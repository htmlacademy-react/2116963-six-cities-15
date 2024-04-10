import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../const';
import { extractActionsTypes, makeFakeFullOffer, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-component';
import { fetchNearOffers, fetchOffer } from '../../store/thunks/offer';
import OfferPage from './offer-page';

describe('Component: OfferPage', () => {
  const scrollToMock = vi.fn();
  window.scrollTo = scrollToMock;

  it('should start loading offer', () => {
    const withHistoryComponent = withHistory(<OfferPage />);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, makeFakeStore({
      offer: {
        offer: null,
        nearOffers: [],
        status: RequestStatus.Idle
      },
    }));

    render(withStoreComponent);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffer.pending.type,
      fetchNearOffers.pending.type,
    ]);
  });

  it('should render Loading if loading', () => {
    const withHistoryComponent = withHistory(<OfferPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offer: {
        offer: null,
        nearOffers: [],
        status: RequestStatus.Loading
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('should render NotFoundPage if failed to load offer', () => {
    const withHistoryComponent = withHistory(<OfferPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offer: {
        offer: null,
        nearOffers: [],
        status: RequestStatus.Failed
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to homepage')).toBeInTheDocument();
  });

  it('should render correctly if offer loaded', () => {
    const offer = makeFakeFullOffer();
    const state = {
      offer: offer,
      nearOffers: [],
      status: RequestStatus.Succeeded
    };
    const withHistoryComponent = withHistory(<OfferPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offer: state,
    }));

    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    if (state.nearOffers.length) {
      expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    }
  });
});
