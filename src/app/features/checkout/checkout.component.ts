import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutService } from './services/checkout.service';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent {
  private readonly _checkoutSvc = inject(CheckoutService)
  public cartStore = inject(CartStore)

  onClearAllFromCart(): void {
    this._checkoutSvc.onClearAllFromCart()
  }

  onContinue() {
    this._checkoutSvc.onContinue()
  }

  onCloseOrder(): void {
    this._checkoutSvc.onProceedToPayService()
  }

  onSaveOrderAsPending() {
    this._checkoutSvc.onSaveHowPending()
  }

  removeItem(id: number): void {
    this._checkoutSvc.removeItem(id)
  }

  removeOneItem(id: number): void {
    this._checkoutSvc.removeOneItemFromCart(id)
  }

}
