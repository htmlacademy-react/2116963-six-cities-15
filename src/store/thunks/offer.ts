import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { FullOffer, Offer } from '../../types/offer';
import { ThunkApi } from '../../types/state';

export const fetchOffer = createAsyncThunk<FullOffer, string, ThunkApi>(
  'offers/fetchOffer',
  async (offerId, { extra: api }) => {
    const response = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return response.data;
  },
);

export const fetchNearOffers = createAsyncThunk<Offer[], string, ThunkApi>(
  'offers/fetchNearOffer',
  async (offerId, { extra: api }) => {
    const response = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return response.data;
  },
);
