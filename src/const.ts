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

// export const Cities = {
//   Paris: 'Paris',
//   Cologne: 'Cologne',
//   Brussels: 'Brussels',
//   Amsterdam: 'Amsterdam',
//   Hamburg: 'Hamburg',
//   Dusseldorf: 'Dusseldorf',
// } as const;

export const Cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
