import { inject, Injectable } from '@angular/core';
import { IProduct } from '@shared/models/products-interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartStore = inject(CartStore)

  hasProduct(): boolean {
    return this.cartStore.products().length > 0
  }

  getProduct(): IProduct[] {
    return this.cartStore.products()
  }

  clearCart(): void {
    this.cartStore.clearCart(false)
  }

}
