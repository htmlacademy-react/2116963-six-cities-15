import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute, AuthorizationStatus, RequestStatus } from '../const';
import { extractActionsTypes, makeFakeOffer, makeFakeStore, makeFakeUser } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import { postFavorite } from '../store/thunks/favorites';
import BookmarkButton from './bookmark-button';

describe('Component: BookmarkButton', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    const className = 'place-card';
    const offer = makeFakeOffer();
    const componentWithHistory = withHistory(<BookmarkButton classStart={className} width={18} height={19} offerId={offer.id} isFavorite={offer.isFavorite} />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByRole('button')).toHaveClass(`${className}__bookmark-button`);
  });

  it('should run postFavorite action on click when authorized', async () => {
    const className = 'place-card';
    const offer = makeFakeOffer();
    const expectedText = 'redirect';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<BookmarkButton classStart={className} width={18} height={19} offerId={offer.id} isFavorite={offer.isFavorite} />} />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(componentWithHistory, makeFakeStore({
      favorites: {
        favorites: [],
        status: RequestStatus.Succeeded
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser()
      },
    }));

    render(withStoreComponent);


    mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${offer.id}/${Number(!offer.isFavorite)}`)
      .reply(200, { ...offer, isFavorite: !offer.isFavorite });

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postFavorite.pending.type,
      postFavorite.fulfilled.type,
    ]);

    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
  });

  it('should redirect when not authorized', async () => {
    const className = 'place-card';
    const offer = makeFakeOffer();
    const expectedText = 'redirect';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<BookmarkButton classStart={className} width={18} height={19} offerId={offer.id} isFavorite={offer.isFavorite} />} />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      favorites: {
        favorites: [],
        status: RequestStatus.Succeeded
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
    }));

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText(expectedText)).toBeInTheDocument();
  });
});
