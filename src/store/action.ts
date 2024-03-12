import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const loadOffers = createAction<Offer[]>('data/loadOffers');
