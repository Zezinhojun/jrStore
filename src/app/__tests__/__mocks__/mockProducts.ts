import { IProduct } from '@shared/models/products-interface';

export const mockProducts: IProduct[] = [
  {
    id: 1,
    title: 'Test Product',
    price: 10,
    category: 'Test Category',
    description: 'Test Description',
    image: 'test-image-url',
    rating: { rate: 4.5, count: 100 },
    qty: 1,
    subTotal: 10,
  },
];
