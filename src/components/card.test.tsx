import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import { makeFakeOffer, makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import Card from './card';

describe('Component: Card', () => {
  it('should render correct, use function on hover and unhover, and direct on click to offer page', async () => {
    const className = 'cities_card';
    const offer = makeFakeOffer();
    const mockFn = vi.fn();
    const expectedText = 'redirect';
    const mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.Root);

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<Card classStart={className} offer={offer} setActiveId={mockFn} />} />
        <Route path={`/offer/${offer.id}`} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({}));

    render(withStoreComponent);

    if (offer.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${offer.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();

    await userEvent.hover(screen.getByRole('article'));
    await userEvent.unhover(screen.getByRole('article'));
    expect(mockFn).toBeCalledTimes(2);

    await userEvent.click(screen.getAllByRole('link')[0]);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
