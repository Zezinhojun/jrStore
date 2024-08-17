import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';
import { IProduct } from '@shared/models/products-interface';
import { CartStore } from '@shared/store/shopping-cart.store';
import { OrdersService } from 'app/features/orders/services/orders.service';

@Injectable({ providedIn: 'root' })

export class CheckoutService {
  private readonly router = inject(Router)
  private readonly cartStore = inject(CartStore)
  private readonly _orderSvc = inject(OrdersService)
  private readonly route = inject(ActivatedRoute);
  order: IOrder | null = null;
  orderId: string | null

  constructor() {
    this.orderId = this.getOrderId()
    this.order = this.route.snapshot.data['order'];
    this.checkAndRemoveOrder();
  }

  updateOrder(orderId: string, state?: string) {
    const order = this._orderSvc.getOrderById(orderId)
    if (order) {
      this._orderSvc.updateOrder(order, state)
    }
  }

  loadCart(id: string) {
    const order = this._orderSvc.getOrderById(id)
    if (order) {
      this.cartStore.clearCart(false)
      order.items.forEach((item: IProduct) => {
        this.cartStore.addToCart(item)
      })
    }
  }

  onClearAllFromCart() {
    this.cartStore.clearCart(true)
  }

  onSaveHowPending() {
    if (this.orderId) {
      this.updateOrder(this.orderId)
      this.clearCurrentOrderId()
    } else {
      this._orderSvc.onSaveHowPending()
      this.router.navigate(["/"])
      this.checkAndRemoveOrder();
      this.clearOrderId()
    }
  }

  onContinue() {
    this.router.navigate(["/"])
  }

  onProceedToPayService(): any {
    this._orderSvc.onCloseOrder()
    this.checkAndRemoveOrder();
  }

  removeItem(id: number) {
    this.cartStore.removeFromCart(id)
  }

  removeOneItemFromCart(id: number): void {
    this.cartStore.removeOneItemFromCart(id)
  }

  checkAndRemoveOrderIfEmpty(id: string) {
    const updatedOrder = this._orderSvc.getOrderById(id)
    if (updatedOrder) {
      this._orderSvc.updateOrder(updatedOrder)
    }
  }

  checkAndRemoveOrder() {
    if (this.order && this.cartStore.products().length === 0) {
      this._orderSvc.removeOneOrder(this.order.id);
    }
  }

  removeOneOrderFromOrders(id: string) {
    this._orderSvc.removeOneOrder(id)
  }



  setCurrentOrderId(orderId: string) {
    localStorage.setItem('currentOrderId', orderId);
  }

  clearCurrentOrderId() {
    localStorage.removeItem('currentOrderId');
  }

  getOrderId(): string | null {
    return this._orderSvc.getOrderId()
  }

  clearOrderId() {
    this._orderSvc.clearOrderId()
  }

  getOrderFromResolver() {
    return this._orderSvc.order()
  }
}
