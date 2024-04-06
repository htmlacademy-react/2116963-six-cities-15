import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import { withExtraArgument } from '../../../node_modules/@reduxjs/toolkit/node_modules/redux-thunk';
import { APIRoute } from '../../const';
import { AppThunkDispatch, extractActionsTypes, makeFakeUser } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { AuthData } from '../../types/user';
import { checkAuthorization, login, logout } from './user';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [withExtraArgument(axios)];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('checkAuthorization', () => {
    it('should dispatch "checkAuthorization.pending" and "checkAuthorization.fulfilled" with thunk "checkAuthorization" and return user data', async () => {
      const user = makeFakeUser();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, user);

      await store.dispatch(checkAuthorization());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthorizationFulfilled = emittedActions.at(1) as ReturnType<typeof checkAuthorization.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        checkAuthorization.pending.type,
        checkAuthorization.fulfilled.type,
      ]);

      expect(checkAuthorizationFulfilled.payload)
        .toEqual(user);
    });

    it('should dispatch "checkAuthorization.pending" and "checkAuthorization.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(404);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorization.pending.type,
        checkAuthorization.rejected.type,
      ]);
    });

    describe('login', () => {
      it('should dispatch "login.pending" and "login.fulfilled" with thunk "login" and return user data', async () => {
        const user = makeFakeUser();
        mockAxiosAdapter.onPost(APIRoute.Login).reply(200, user);
        const authData: AuthData = {
          email: 'test@gmail.com',
          password: '123asd'
        };

        await store.dispatch(login(authData));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const loginFulfilled = emittedActions.at(1) as ReturnType<typeof login.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          login.pending.type,
          login.fulfilled.type,
        ]);

        expect(loginFulfilled.payload)
          .toEqual(user);
      });
    });

    describe('logout', () => {
      it('should dispatch "logout.pending" and "logout.fulfilled" with thunk "logout"', async () => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

        await store.dispatch(logout());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          logout.pending.type,
          logout.fulfilled.type,
        ]);
      });
    });
  });
});
