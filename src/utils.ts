import type { Offer, CityName } from './types/offer';
import type { Review } from './types/review';
import { CITIES } from './const';

export function formatRating(rating: number) {
  return `${Math.round(rating) * 20}%`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(date));
}

export function compareReviewDates(a: Review, b: Review) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function isPathRootCity(path: string) {
  return CITIES.some((city) => path.startsWith(`/${city.slug}`));
}

export function getNearOffers(
  offers: Offer[],
  currentId: string | undefined,
  currentCityName: CityName,
  limit: number
) {
  const offersByCity = offers.filter((offer) => offer.city.name === currentCityName);
  const nearOffers: Offer[] = [];
  for (let i = 0; i < offersByCity.length; i++) {
    if (offersByCity[i].id !== currentId) {
      nearOffers.push(offersByCity[i]);
    }
    if (nearOffers.length === limit) {
      break;
    }
  }
  return nearOffers;
}
