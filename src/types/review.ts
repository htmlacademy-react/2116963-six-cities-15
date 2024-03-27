export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type ReviewToSent = {
  offerId: string;
  reviewInfo: {
    comment: string;
    rating: number;
  };
  clearForm: () => void;
}
