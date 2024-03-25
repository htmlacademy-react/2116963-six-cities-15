import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { dropToken, saveToken } from '../../services/token';
import { ThunkApi } from '../../types/state';
import { AuthData, UserData } from '../../types/user';

export const checkAuthorization = createAsyncThunk<UserData, undefined, ThunkApi>(
  'user/checkAuthorization',
  async (_arg, { extra: api }) => {
    const response = await api.get<UserData>(APIRoute.Login);
    return response.data;
  },
);

export const login = createAsyncThunk<UserData, AuthData, ThunkApi>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, ThunkApi>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
