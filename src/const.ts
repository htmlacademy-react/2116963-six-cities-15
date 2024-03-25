import type { Offer } from './types/offer';

export const CITIES = [
  { name: 'Paris', slug: 'paris' },
  { name: 'Cologne', slug: 'cologne' },
  { name: 'Brussels', slug: 'brussels' },
  { name: 'Amsterdam', slug: 'amsterdam' },
  { name: 'Hamburg', slug: 'hamburg' },
  { name: 'Dusseldorf', slug: 'dusseldorf' },
] as const;

export const AppRoute = {
  Root: '/',
  RootCity: `/${CITIES[0].slug}`,
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id'
} as const;

export const enum AuthorizationStatus {
  Unknown,
  Auth,
  NoAuth,
}

export const SORTING_OPTIONS = [
  { text: 'Popular', compare: undefined },
  { text: 'Price: low to high', compare: (a: Offer, b: Offer) => a.price - b.price },
  { text: 'Price: high to low', compare: (a: Offer, b: Offer) => b.price - a.price },
  { text: 'Top rated first', compare: (a: Offer, b: Offer) => b.rating - a.rating },
] as const;

export const enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}

export const enum RequestStatus {
  Idle,
  Loading,
  Succeeded,
  Failed
}
