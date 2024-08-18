import { inject, Injectable, signal } from '@angular/core';
import { IOrder } from '@shared/models/orders-interface';
import { OrderStore } from '@shared/store/order.store';
import { Status } from '@shared/utils/order-status';
import { CartService } from './cart/cart.service';
import { NavigationService } from '@shared/services/navigation/navigation.service';

@Injectable({ providedIn: 'root' })

export class OrdersService {
  public orderId = signal<string>("")

  private readonly _cartSvc = inject(CartService)
  private readonly _navigationSvc = inject(NavigationService)
  private readonly orderStore = inject(OrderStore)

  clearFilter(): void {
    this.orderStore.clearFilter();
  }

  findOrderById(id: string): IOrder | undefined {
    return this.orderStore.findOrderById(id)
  }

  filterOrdersByState(state: string): void {
    this.orderStore.filterOrdersByState(state)
  }

  removeAllOrders(): void {
    this.orderStore.removeAllOrders()
  }

  removeOrderById(id: string): void {
    this.orderStore.removeOrderById(id)
  }

  closeOrder(): void {
    if (!this._cartSvc.hasProduct()) {
      console.log("Carrinho está vazio");
      return
    }
    this.orderStore.addOrder(this._cartSvc.getProduct(), Status.CLOSED)
    this._cartSvc.clearCart()
    this.resetOrderId()
    this._navigationSvc.navigateToOrders()
  }

  saveOrderAsPending(): void {
    if (this._cartSvc.hasProduct()) {
      this.orderStore.addOrder(this._cartSvc.getProduct(), Status.PENDING)
      this._cartSvc.clearCart()
      this.resetOrderId()
    }
  }

  updateOrder(order: IOrder, state?: string): void {
    if (this._cartSvc.hasProduct()) {
      this.orderStore.updateOrder(order, this._cartSvc.getProduct(), state)
      this._cartSvc.clearCart()
      this.resetOrderId()
      this._navigationSvc.navigateToOrders()
    }
  }

  storeOrderId(id: string): void {
    this.orderId.set(id)
  }

  retrieveOrderId(): string {
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
}
