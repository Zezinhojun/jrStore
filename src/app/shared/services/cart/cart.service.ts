import { inject, Injectable, signal } from '@angular/core';
import { IProduct } from '@shared/models/products-interface';
import { CartStore } from '@shared/store/shopping-cart.store';
import GlobalErrorHandler from '../globalErrorHandling/globalErrorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartStore = inject(CartStore);
  private readonly _globalErrorHandler = inject(GlobalErrorHandler);
  readonly products = signal(() => this.cartStore.products());
  readonly totalAmount = signal(() => this.cartStore.totalAmount());
  readonly productsCount = signal(() => this.cartStore.productsCount());

  hasProduct(): boolean {
    try {
      return this.cartStore.products().length > 0;
    } catch (error) {
      this._globalErrorHandler.handleError(error);
      return false;
    }
  }

  getProduct(): IProduct[] {
    try {
      return this.cartStore.products();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
      return [];
    }
  }

  clearCart(notification: boolean): void {
    try {
      this.cartStore.resetCart(notification);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  addToCart(product: IProduct): void {
    try {
      this.cartStore.addProductToCart(product);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  removeFromCart(id: number): void {
    try {
      this.cartStore.removeProductFromCart(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  decrementProductQuantity(id: number): void {
    try {
      this.cartStore.decrementProductQuantity(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  get FullState() {
    try {
      return {
        products: this.products(),
        totalAmount: this.totalAmount(),
        productsCount: this.productsCount(),
      };
    } catch (error) {
      this._globalErrorHandler.handleError(error);
      return {
        products: [],
        totalAmount: 0,
        productsCount: 0,
      };
    }
  }
}
