export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  dealerId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  carMake: string;
  carModel: string;
  carYear: number;
  purchaseDate: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface CarMake {
  id: string;
  name: string;
  description: string;
}

export interface CarModel {
  id: string;
  makeId: string;
  name: string;
  year: number;
  description: string;
}

export interface AppState {
  user: User | null;
  dealers: Dealer[];
  reviews: Review[];
  carMakes: CarMake[];
  carModels: CarModel[];
  selectedState: string;
  isLoading: boolean;
}