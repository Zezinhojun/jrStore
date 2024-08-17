import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Status } from '@shared/utils/order-status';

import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent implements OnInit {
  private readonly _checkoutSvc = inject(CheckoutService)
  private readonly route = inject(ActivatedRoute)
  public cartStore = inject(CartStore)
  private order: IOrder | null = null

  ngOnInit() {
    this.order = this.route.snapshot.data['order'];
  }

  onClearAllFromCart(): void {
    if (this.order) {
      this._checkoutSvc.removeOneOrderFromOrders(this.order.id)
      this._checkoutSvc.clearCurrentOrderId()
    }
    this._checkoutSvc.onClearAllFromCart()
    this._checkoutSvc.clearCurrentOrderId()
  }

  onContinue() {
    this._checkoutSvc.onContinue()
  }

  onCloseOrder(): void {
    const orderId = this._checkoutSvc.getOrderId()
    if (orderId) {
      const state = Status.CLOSED
      this._checkoutSvc.updateOrder(orderId, state)
      this._checkoutSvc.clearCurrentOrderId()
    } else {
      this._checkoutSvc.onProceedToPayService()
      this._checkoutSvc.clearCurrentOrderId()
    }
  }

  onSaveOrderAsPending() {

    const orderId = this._checkoutSvc.getOrderId()
    if (orderId) {
      this._checkoutSvc.updateOrder(orderId)
      this._checkoutSvc.clearCurrentOrderId()
    } else {
      this._checkoutSvc.onSaveHowPending()
      this._checkoutSvc.clearCurrentOrderId()
    }
  }

  removeItem(id: number): void {
    this._checkoutSvc.removeItem(id)
  }

  removeOneItem(id: number): void {
    this._checkoutSvc.removeOneItemFromCart(id)
  }




}
