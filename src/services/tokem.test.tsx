import { AUTH_TOKEN_KEY_NAME } from '../const';
import { dropToken, getToken, saveToken } from './token';

describe('getToken', () => {
  it('should return the token if it exists in localStorage', () => {
    expect(getToken()).toBe('');
  });

  it('should return an empty string if token does not exist in localStorage', () => {
    const token = 'testToken';
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);

    expect(getToken()).toBe(token);
  });
});

describe('saveToken', () => {
  it('should save the token to localStorage', () => {
    const token = 'testToken';

    saveToken(token);

    expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe(token);
  });
});

describe('dropToken', () => {
  it('should remove the token from localStorage', () => {
    const token = 'testToken';
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);

    dropToken();

    expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBeNull();
  });
});
