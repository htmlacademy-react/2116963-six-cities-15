import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../const';
import { makeFakeStore } from '../mock/mock';
import { withHistory, withStore } from '../mock/mock-component';
import LoginPage from './login-page';

describe('LoginPage', () => {
  const store = makeFakeStore({
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    }
  });

  it('should render the login form', () => {
    const { withStoreComponent } = withStore(<LoginPage />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByText('Sign in').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const email = 'abc@mail.com';
    const password = '123456';
    const { withStoreComponent } = withStore(<LoginPage />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const emailElement = screen.getByPlaceholderText('Email');
    const passwordElement = screen.getByPlaceholderText('Password');

    await userEvent.type(
      emailElement,
      email,
    );
    await userEvent.type(
      passwordElement,
      password,
    );

    expect(screen.getByDisplayValue(email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();
  });
});
