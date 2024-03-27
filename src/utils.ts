import type { Offer } from './types/offer';
import type { Review } from './types/review';

export function formatRating(rating: number) {
  return `${Math.round(rating) * 20}%`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(date));
}

export function compareReviewDates(a: Review, b: Review) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getNearOffers(
  offers: Offer[],
  currentId: string | undefined,
  limit: number
) {
  const nearOffers: Offer[] = [];
  for (const offer of offers) {
    if (offer.id !== currentId) {
      nearOffers.push(offer);
      if (nearOffers.length === limit) {
        return nearOffers;
      }
    }
  }
  return nearOffers;
}
