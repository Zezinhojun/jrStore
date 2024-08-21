import { inject, Injectable, signal } from '@angular/core';
import { IOrder } from '@shared/models/orders-interface';
import { NavigationService } from '@shared/services/navigation/navigation.service';
import { OrderService } from '@shared/services/order/order.service';
import { Status } from '@shared/utils/order-status';

import { CartService } from '../../../shared/services/cart/cart.service';

@Injectable({ providedIn: 'root' })

export class OrdersService {
  public orderId = signal<string>("")
  private readonly _cartSvc = inject(CartService)
  private readonly _navigationSvc = inject(NavigationService)
  private readonly _orderSvc = inject(OrderService)

  resetOrderFilter(): void {
    this._orderSvc.resetOrderFilter();
  }

  getOrderById(id: string): IOrder | undefined {
    return this._orderSvc.getOrderById(id);
  }

  filterOrdersByState(state: string): void {
    this._orderSvc.filterOrdersByState(state);
  }

  deleteAllOrders(): void {
    this._orderSvc.deleteAllOrders();
  }

  deleteOrderById(id: string): void {
    this._orderSvc.deleteOrderById(id);
  }

  closeOrder(): void {
    this._orderSvc.addOrder(this._cartSvc.getProduct(), Status.CLOSED);
    this._cartSvc.clearCart(false);
    this.resetOrderId();
    this._navigationSvc.navigateToOrders();
  }

  saveOrderAsPending(): void {
    if (this._cartSvc.hasProduct()) {
      this._orderSvc.addOrder(this._cartSvc.getProduct(), Status.PENDING)
      this._cartSvc.clearCart(false)
      this.resetOrderId()
    }
  }

  updateOrderById(order: IOrder, state?: string): void {
    if (this._cartSvc.hasProduct()) {
      this._orderSvc.updateOrderById(order, this._cartSvc.getProduct(), state)
      this._cartSvc.clearCart(false)
      this.resetOrderId()
      this._navigationSvc.navigateToOrders()
    }
  }

  storeOrderId(id: string): void {
    this.orderId.set(id)
  }

  retrieveOrderId(): string | undefined {
    return this.orderId()
  }

  resetOrderId(): void {
    this.orderId.set("")
  }

  continueShopping(): void {
    this.resetOrderId()
    this._navigationSvc.navigateHome()
  }

  goToCheckout(id: string): void {
    this._navigationSvc.navigateToCheckout(id);
  }

  getOrders() {
    return this._orderSvc.orders();
  }

  getTotalAmount() {
    return this._orderSvc.totalAmount();
  }

  getOrdersCount() {
    return this._orderSvc.ordersCount();
  }

  getFilteredOrders() {
    return this._orderSvc.filteredOrders();
  }

}
