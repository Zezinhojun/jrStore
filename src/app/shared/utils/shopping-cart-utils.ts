import { IProduct } from "@shared/models/products-interface"

export const calculateTotalAmount = (products: IProduct[]): number => {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0)
}
export const calculateProductCount = (products: IProduct[]): number => {
  return products.reduce((acc, product) => acc + product.qty, 0)
}
