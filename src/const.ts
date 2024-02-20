export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id'
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;
