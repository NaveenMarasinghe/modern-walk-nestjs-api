import { IProductRating } from './IProductRating';

export interface IProduct {
  id: number;
  tenantId: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IProductRating;
}
