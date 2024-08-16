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
    this._checkoutSvc.onClearAllFromCart()
  }

  onContinue() {
    this._checkoutSvc.onContinue()
  }

  onCloseOrder(): void {
    if(this.order){
      const state = Status.CLOSED
      this._checkoutSvc.updateOrder(this.order, state)
    } else{
      this._checkoutSvc.onProceedToPayService()
    }
  }

  onSaveOrderAsPending() {
    if(this.order){
      this._checkoutSvc.updateOrder(this.order)
    } else{
      this._checkoutSvc.onSaveHowPending()
    }
  }

  removeItem(id: number): void {
    this._checkoutSvc.removeItem(id)
  }

  removeOneItem(id: number): void {
    this._checkoutSvc.removeOneItemFromCart(id)
  }


}
