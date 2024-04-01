import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { Offer } from '../../types/offer';
import { ThunkApi } from '../../types/state';
import { FavoriteStatus } from '../../types/favorites';

export const fetchFavorites = createAsyncThunk<Offer[], undefined, ThunkApi>(
  'favorites/fetchFavorites',
  async (_arg, { extra: api }) => {
    const response = await api.get<Offer[]>(APIRoute.Favorites);
    return response.data;
  },
);

export const postFavorite = createAsyncThunk<Offer, FavoriteStatus, ThunkApi>(
  'favorites/postFavorite',
  async ({ offerId, status }, { extra: api }) => {
    const response = await api.post<Offer>(`${APIRoute.Favorites}/${offerId}/${+status}`);
    return response.data;
  },
);
