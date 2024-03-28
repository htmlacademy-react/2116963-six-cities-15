import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { Review, ReviewToSend } from '../../types/review';
import { ThunkApi } from '../../types/state';

export const fetchReviews = createAsyncThunk<Review[], string, ThunkApi>(
  'reviews/fetchReviews',
  async (offerId, { extra: api }) => {
    const response = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return response.data;
  },
);

export const postReview = createAsyncThunk<Review, ReviewToSend, ThunkApi>(
  'reviews/postReview',
  async ({ offerId, reviewInfo }, { extra: api }) => {
    const response = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, reviewInfo);
    return response.data;
  },
);
