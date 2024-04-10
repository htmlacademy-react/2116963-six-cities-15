import { CITIES } from "./const";
import { makeFakeOffer, makeFakeReview } from './mock/mock';
import { compareReviewDates, formatDate, formatRating, getNearOffers, getRandomItem, makeLowerCaseFirstLetter } from "./utils";

describe('Utils', () => {
  it('formatRating', () => {
    const rating = 4.3;
    const expectedResult = '80%';

    expect(formatRating(rating)).toBe(expectedResult);
  });

  it('formatDate', () => {
    const date = '2024-03-20T21:00:00.051Z';
    const expectedResult = 'March 2024';

    expect(formatDate(date)).toBe(expectedResult);
  });

  it('compareReviewDates', () => {
    const review1 = { ...makeFakeReview(), date: '2024-03-20T21:00:00.051Z' };
    const review2 = { ...makeFakeReview(), date: '2024-03-21T21:00:00.051Z' };

    expect(compareReviewDates(review1, review2)).toBeGreaterThan(0);
  });

  it('getNearOffers', () => {
    const currentId = '6af6f711-c28d-4121-82cd-e0b462a27f00';
    const limit = 3;
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer(), makeFakeOffer(), { ...makeFakeOffer(), id: currentId }];

    const resultNearOffers = getNearOffers(offers, currentId, limit);

    expect(resultNearOffers.length).toBe(limit);
    expect(resultNearOffers.some((offer) => offer.id === currentId)).toBe(false);
  });

  it('makeLowerCaseFirstLetter', () => {
    const text = 'Test';
    const expectedText = 'test';

    const result = makeLowerCaseFirstLetter(text);

    expect(result).toBe(expectedText);
  });

  it('getRandomItem', () => {
    const list = CITIES;

    const result = getRandomItem(list);

    expect(list).toContain(result);
  });
});
