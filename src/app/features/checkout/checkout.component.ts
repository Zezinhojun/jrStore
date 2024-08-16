import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CheckoutService } from './services/checkout.service';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Router } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent implements OnInit {
  private readonly _checkoutSvc = inject(CheckoutService)
  public cartStore = inject(CartStore)
  private readonly router = inject(Router)
  order: any

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    console.log('Current navigation:', navigation); // Log to check the navigation state
    if (navigation?.extras?.state?.['order']) {
      this.order = navigation.extras.state['order'];
      console.log('Order found:', this.order); // Log to check the order
      this._checkoutSvc.loadCart(this.order);
    } else {
      console.error('No order found in navigation state.');
    }
  }

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
