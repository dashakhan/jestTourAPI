export interface User {
  userId: string;
  username: string;
  email: string;
  avatar?: string;
  password: string;
  birthdate?: Date;
  registeredAt?: Date;
}

export interface Tour {
  name: string;
  slug?: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingAverage?: number;
  ratingQuantity?: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: [string];
  createdAt?: Date;
  startDates?: Date;
  secretTour?: boolean;
  startLocation: number[];
  guides?:[];

}