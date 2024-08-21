import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CheckoutService } from './services/checkout.service';
import { IProduct } from '@shared/models/products-interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  private readonly _checkoutSvc = inject(CheckoutService);
  public cartProducts = this._checkoutSvc.getCartProducts();
  public cartTotalAmount = this._checkoutSvc.getCartTotalAmount();
  public cartProductsCount = this._checkoutSvc.getCartProductsCount();

  onClearAllFromCart(): void {
    this._checkoutSvc.handleClearAllFromCart();
  }

  onContinue() {
    this._checkoutSvc.navigateToHomePage();
  }

  onCloseOrder(): void {
    this._checkoutSvc.finalizeOrder();
  }

  onSaveOrderAsPending() {
    this._checkoutSvc.saveOrderAsPending();
  }

  removeItem(id: number): void {
    this._checkoutSvc.removeProductFromCart(id);
  }

  removeOneItem(id: number): void {
    this._checkoutSvc.decrementProductQuantity(id);
  }
  addToCart(product: IProduct): void {
    this._checkoutSvc.addToCart(product);
  }
}
