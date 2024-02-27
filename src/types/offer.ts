export type CitiesType = 'Paris'| 'Cologne'| 'Brussels'| 'Amsterdam'| 'Hamburg'| 'Dusseldorf';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
      name: CitiesType;
      location: {
          latitude: number;
          longitude: number;
          zoom: number;
      };
  };
  location: {
      latitude: number;
      longitude: number;
      zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
