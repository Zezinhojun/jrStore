import { inject, Injectable, signal } from '@angular/core';
import { IProduct } from '@shared/models/products-interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartStore = inject(CartStore)
  readonly products = signal(() => this.cartStore.products());
  readonly totalAmount = signal(() => this.cartStore.totalAmount());
  readonly productsCount = signal(() => this.cartStore.productsCount());

  hasProduct(): boolean {
    return this.cartStore.products().length > 0
  }

  getProduct(): IProduct[] {
    return this.cartStore.products()
  }

  clearCart(notification: boolean): void {
    this.cartStore.clearCart(notification);
  }

  addToCart(product: IProduct): void {
    this.cartStore.addToCart(product);
  }

  removeFromCart(id: number): void {
    this.cartStore.removeFromCart(id);
  }

  decrementProductQuantity(id: number): void {
    this.cartStore.removeOneItemFromCart(id);
  }

  getFullState() {
    return {
      products: this.products(),
      totalAmount: this.totalAmount(),
      productsCount: this.productsCount()
    };
  }
}
