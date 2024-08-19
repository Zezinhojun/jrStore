import { inject, Injectable, signal } from '@angular/core';
import { IOrder } from '@shared/models/orders-interface';
import GlobalErrorHandler from '@shared/services/globalErrorHandling/globalErrorHandler.service';
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

  clearFilter(): void {
    this._orderSvc.clearFilter();
  }

  findOrderById(id: string): IOrder | undefined {
    return this._orderSvc.findOrderById(id);
  }

  filterOrdersByState(state: string): void {
    this._orderSvc.filterOrdersByState(state);
  }

  removeAllOrders(): void {
    this._orderSvc.removeAllOrders();
  }

  removeOrderById(id: string): void {
    this._orderSvc.removeOrderById(id);
  }

  closeOrder(): void {
    if (!this._cartSvc.hasProduct()) {
      console.log("Carrinho está vazio");
      return;
    }
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

  updateOrder(order: IOrder, state?: string): void {
    if (this._cartSvc.hasProduct()) {
      this._orderSvc.updateOrder(order, this._cartSvc.getProduct(), state)
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
