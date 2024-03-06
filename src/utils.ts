export function formatRating(rating: number) {
  return `${Math.round(rating) * 20}%`;
}
