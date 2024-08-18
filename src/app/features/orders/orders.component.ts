import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderStore } from '@shared/store/order.store';

import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export default class OrdersComponent {
  private readonly _ordersSvc = inject(OrdersService)
  public orderStore = inject(OrderStore)

  applyFilter(state: string) {
    this._ordersSvc.filterOrdersByState(state);
  }

  clearFilter() {
    this._ordersSvc.clearFilter();
  }

  clearOrders() {
    this._ordersSvc.removeAllOrders()
  }

  onCloseOrder(): void {
    this._ordersSvc.closeOrder()
  }

  onContinue(): void {
    this._ordersSvc.continueShopping()
  }

  removeOneOrder(id: string) {
    this._ordersSvc.removeOrderById(id)
  }

  onGoToCheckout(id: string) {
    this._ordersSvc.storeOrderId(id)
    this._ordersSvc.goToCheckout(id)
  }
}
