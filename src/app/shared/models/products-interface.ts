interface Rating {
  rate: number;
  count: number
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
  qty: number;
  subTotal: number
}
