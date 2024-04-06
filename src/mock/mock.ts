import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { FullOffer, Offer } from '../types/offer';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Review } from '../types/review';
import { UserData } from '../types/user';
import { AuthorizationStatus, RequestStatus } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  offers: {
    offers: [],
    activeId: '',
    status: RequestStatus.Idle
  },
  offer: {
    offer: null,
    nearOffers: [],
    status: RequestStatus.Idle
  },
  reviews: {
    reviews: [],
    status: RequestStatus.Idle
  },
  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null
  },
  favorites: {
    favorites: [],
    status: RequestStatus.Idle
  },
  ...initialState ?? {},
});

export function makeFakeOffer(isFavorite = false): Offer {
  return {
    'id': 'f644d71b-def4-4a05-9878-f557b80f3ae0',
    'title': 'Wood and stone place',
    'type': 'hotel',
    'price': 409,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    'isFavorite': isFavorite,
    'isPremium': true,
    'rating': 3
  };
}

export function makeFakeFullOffer(): FullOffer {
  return {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Heating'
    ],
    'host': {
      'name': 'Oliver Conner',
      'avatarUrl': 'https://url-to-image/image.png',
      'isPro': false
    },
    'images': [
      'https://url-to-image/image.png'
    ],
    'maxAdults': 4
  };
}

export function makeFakeReview(): Review {
  return {
    'id': 'f644d71b-def4-4a05-9878-f557b80f3ae0',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'https://url-to-image/image.png',
      'isPro': false
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 4
  };
}

export function makeFakeUser(): UserData {
  return {
    'name': 'Oliver Conner',
    'avatarUrl': 'https://url-to-image/image.png',
    'isPro': false,
    'email': 'Oliver.conner@gmail.com',
    'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };
}
