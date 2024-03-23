import { APIRoute } from '../../const';
import { Offer } from '../../types/offer';
import { ThunkApi } from '../../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOffers = createAsyncThunk<Offer[], undefined, ThunkApi>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const response = await api.get<Offer[]>(APIRoute.Offers);
    return response.data;
  },
);
