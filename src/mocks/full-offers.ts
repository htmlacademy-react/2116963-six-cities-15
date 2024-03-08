import { FullOffer } from '../types/offer';

export const fullOffers: FullOffer[] = [
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 220,
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 10
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.873877537499948,
      'zoom': 11
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.5,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 4,
    'goods': [
      'Heating',
      'Wi-Fi',
      'Kitchen'
    ],
    'host': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': false
    },
    'images': [
      'https://15.design.htmlacademy.pro/static/hotel/14.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/14.jpg'
    ],
    'maxAdults': 5
  },
  {
    'id': 'f644d71b-def4-4a05-9878-f557b80f3ae0',
    'title': 'Wood and stone place',
    'type': 'hotel',
    'price': 409,
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 10
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 11
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 3,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 4,
    'goods': [
      'Heating',
      'Wi-Fi',
      'Kitchen'
    ],
    'host': {
      'name': 'Oliver Conner',
      'avatarUrl': 'img/avatar-max.jpg',
      'isPro': true
    },
    'images': [
      'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/17.jpg'
    ],
    'maxAdults': 4
  }
];
