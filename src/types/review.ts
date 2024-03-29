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

export type ReviewToSend = {
  offerId: string;
  reviewInfo: {
    comment: string;
    rating: number;
  };
}
