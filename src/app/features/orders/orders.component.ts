import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

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
  public readonly orders = this._ordersSvc.getOrders();
  public readonly totalAmount = this._ordersSvc.getTotalAmount();
  public readonly ordersCount = this._ordersSvc.getOrdersCount();
  public readonly filteredOrders = this._ordersSvc.getFilteredOrders();

  applyFilter(state: string) {
    this._ordersSvc.filterOrdersByState(state);
  }

  clearFilter() {
    this._ordersSvc.resetOrderFilter();
  }

  clearOrders() {
    this._ordersSvc.deleteAllOrders()
  }

  onCloseOrder(): void {
    this._ordersSvc.closeOrder()
  }

  onContinue(): void {
    this._ordersSvc.continueShopping()
  }

  removeOneOrder(id: string) {
    this._ordersSvc.deleteOrderById(id)
  }

  onGoToCheckout(id: string) {
    this._ordersSvc.storeOrderId(id)
    this._ordersSvc.goToCheckout(id)
  }
}
