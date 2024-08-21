import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

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
  public selectFilter: 'closed' | 'pending' | 'clear' = 'clear';
  public isSelectDropdownOpen = signal<boolean>(false);
  private dropdownStates: { [key: number]: boolean } = {};

  applyFilter(order: 'closed' | 'pending' | 'clear') {
    this._ordersSvc.filterOrdersByState(order);
    this.isSelectDropdownOpen.set(false);
    this.selectFilter = order;
  }

  clearFilter() {
    this._ordersSvc.resetOrderFilter();
    this.isSelectDropdownOpen.set(false);
    this.selectFilter = "clear";
  }

  clearOrders() {
    this._ordersSvc.deleteAllOrders()
  }

  onCloseOrder(): void {
    this._ordersSvc.closeOrder()
  }

  onContinue(): void {
    this._ordersSvc.continueShopping()
    this._ordersSvc.clearCart()
  }

  removeOneOrder(id: string) {
    this._ordersSvc.deleteOrderById(id)
  }

  onGoToCheckout(id: string) {
    this._ordersSvc.storeOrderId(id)
    this._ordersSvc.goToCheckout(id)
  }

  toggleSelectDropdown() {
    this.isSelectDropdownOpen.set(!this.isSelectDropdownOpen())
  }

  toggleActionDropdown(itemId: string) {
    this.dropdownStates[parseInt(itemId)] = !this.dropdownStates[parseInt(itemId)];
  }

  isActionDropdownOpen(itemId: string): boolean {
    return !!this.dropdownStates[parseInt(itemId)];
  }

}
