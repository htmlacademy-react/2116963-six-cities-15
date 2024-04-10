import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock/mock-component';
import { makeFakeStore, makeFakeUser } from '../mock/mock';
import LoggedWrapper from './logged-wrapper';
import { AuthorizationStatus } from '../const';


describe('Component: LoggedWrapper', () => {
  it('should render correctly when not authorized', () => {
    const expectedText = 'Test element';
    const children = <span>{expectedText}</span>;

    const componentWithHistory = withHistory(<LoggedWrapper>{children}</LoggedWrapper>);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      },
    }));

    render(withStoreComponent);

    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
  });

  it('should render correctly when authorized', () => {
    const expectedText = 'Test element';
    const children = <span>{expectedText}</span>;

    const componentWithHistory = withHistory(<LoggedWrapper>{children}</LoggedWrapper>);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser()
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
