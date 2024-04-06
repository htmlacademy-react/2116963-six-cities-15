import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../mock/mock';
import { AuthData } from '../../types/user';
import { userActions, userSelectors, userSlice } from './user';

describe('User Slice', () => {
  describe('Reducers', () => {
    it('should return same state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser()
      };

      const result = userSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null
      };

      const result = userSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set authorization with "setAuthorization"', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null
      };

      const expectedAuthorizationStatus = AuthorizationStatus.NoAuth;

      const result = userSlice.reducer(initialState, userActions.setAuthorization(AuthorizationStatus.NoAuth));

      expect(result.authorizationStatus).toEqual(expectedAuthorizationStatus);
    });
  });

  describe('Selectors', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: makeFakeUser()
    };

    it('should user data User from state', () => {
      const expectedUser = state.userData;
      const result = userSelectors.userData.unwrapped(state);
      expect(result).toBe(expectedUser);
    });

    it('should return status from state', () => {
      const expectedStatus = state.authorizationStatus;
      const result = userSelectors.authorizationStatus.unwrapped(state);
      expect(result).toBe(expectedStatus);
    });
  });

  describe('Extra Reducers', () => {
    it('should set User and AuthorizationStatus.Auth with "checkAuthorization.fulfilled"', () => {
      const user = makeFakeUser();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: user
      };

      const result = userSlice.reducer(undefined, userActions.checkAuthorization.fulfilled(user, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set AuthorizationStatus.NoAuth with "checkAuthorization.rejected"', () => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };

      const result = userSlice.reducer(undefined, userActions.checkAuthorization.rejected(null, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set User and AuthorizationStatus.Auth with "login.fulfilled"', () => {
      const user = makeFakeUser();
      const initialState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: user
      };
      const authData: AuthData = {
        email: 'test@gmail.com',
        password: '123asd'
      };

      const result = userSlice.reducer(initialState, userActions.login.fulfilled(user, '', authData));

      expect(result).toEqual(expectedState);
    });

    it('should set null and AuthorizationStatus.NoAuth with "logout.fulfilled"', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUser()
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null
      };

      const result = userSlice.reducer(initialState, userActions.logout.fulfilled(undefined, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });
});
