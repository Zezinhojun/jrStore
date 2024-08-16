import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';
import { CheckoutService } from './services/checkout.service';
import { IProduct } from '@shared/models/products-interface';

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

  onContinue(){
    this._checkoutSvc.onContinue()
  }

  onSaveOrderAsPending(){
    this._checkoutSvc.onSaveHowPending()
  }

  onCloseOrder(): void {
    this._checkoutSvc.onProceedToPayService()
  }

  removeItem(id: number): void {
    this.cartStore.removeFromCart(id)
  }

  removeOneItem(id: number): void {
    this.cartStore.removeOneItemFromCart(id)
  }

  clearAll(): void {
    this.cartStore.clearCart()
  }
}
