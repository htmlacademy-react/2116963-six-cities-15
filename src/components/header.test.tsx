import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import { makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import Header from './header';

describe('Component: Header', () => {
  const mockHistory = createMemoryHistory();

  it('should render correctly', () => {
    mockHistory.push(AppRoute.Root);

    const componentWithHistory = withHistory(
      <Header />,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    const {container} = render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(container.querySelector('.header__nav')).toBeInTheDocument();
  });

  it('should render correctly on LoginPage', () => {
    mockHistory.push(AppRoute.Login);

    const componentWithHistory = withHistory(
      <Header />,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    const {container} = render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(container.querySelector('.header__nav')).not.toBeInTheDocument();
  });

  it('should redirect to main when click on logo', async () => {
    const currentPath = '/route';
    mockHistory.push(currentPath);
    const expectedText = 'MainPage';

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={currentPath} element={<Header />} />
        <Route path={AppRoute.RootCity} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    await userEvent.click(screen.getAllByRole('link')[0]);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
