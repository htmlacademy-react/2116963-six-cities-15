import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { FullOffer, Offer } from '../types/offer';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Review } from '../types/review';
import { UserData } from '../types/user';
import { AuthorizationStatus, CITIES, RequestStatus } from '../const';
import { faker } from '@faker-js/faker';
import { getRandomItem } from '../utils';

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
    id: faker.string.uuid(),
    title: faker.lorem.words(),
    type: faker.helpers.arrayElement(['hotel', 'apartment', 'house']),
    price: faker.number.int({ min: 50, max: 1000 }),
    previewImage: faker.image.url(),
    city: {
      name: getRandomItem(CITIES).name,
      location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zoom: faker.number.int({ min: 10, max: 15 })
      }
    },
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      zoom: faker.number.int({ min: 10, max: 15 })
    },
    isFavorite,
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5 })
  };
}

export function makeFakeFullOffer(): FullOffer {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(['hotel', 'apartment', 'house']),
    price: faker.number.int({ min: 50, max: 1000 }),
    city: {
      name: getRandomItem(CITIES).name,
      location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        zoom: faker.number.int({ min: 8, max: 12 })
      }
    },
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      zoom: faker.number.int({ min: 8, max: 12 })
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5 }),
    description: faker.lorem.paragraph(),
    bedrooms: faker.number.int({ min: 1, max: 6 }),
    goods: [faker.lorem.word()],
    host: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean()
    },
    images: [faker.image.url()],
    maxAdults: faker.number.int({ min: 1, max: 10 })
  };
}

export function makeFakeReview(): Review {
  return {
    id: faker.string.uuid(),
    date: faker.date.past().toISOString(),
    user: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean()
    },
    comment: faker.lorem.paragraph(),
    rating: faker.number.int({ min: 1, max: 5 })
  };
}

export function makeFakeUser(): UserData {
  return {
    name: faker.person.fullName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
    email: faker.internet.email(),
    token: faker.string.sample(32)
  };
}
