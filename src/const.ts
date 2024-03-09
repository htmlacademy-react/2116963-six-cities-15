export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id'
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = [
  { name: 'Paris', slug: 'paris' },
  { name: 'Cologne', slug: 'cologne' },
  { name: 'Brussels', slug: 'brussels' },
  { name: 'Amsterdam', slug: 'amsterdam' },
  { name: 'Hamburg', slug: 'hamburg' },
  { name: 'Dusseldorf', slug: 'dusseldorf' },
] as const;
