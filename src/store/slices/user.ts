import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { UserData } from '../../types/user';
import { checkAuthorization, login, logout } from '../thunks/user';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    userData: (state) => state.userData,
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
    builder.addCase(checkAuthorization.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      state.userData = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
    builder.addCase(logout.fulfilled, (state) => {
      dropToken();
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  },
});

const userActions = {...userSlice.actions, checkAuthorization, login, logout};
const userSelectors = userSlice.selectors;

export { userActions, userSelectors, userSlice };

