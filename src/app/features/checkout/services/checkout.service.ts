import { inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';
import { IProduct } from '@shared/models/products-interface';
import { NavigationService } from '@shared/services/navigation/navigation.service';
import { Status } from '@shared/utils/order-status';
import { CartService } from 'app/features/orders/services/cart/cart.service';
import { OrdersService } from 'app/features/orders/services/orders.service';

@Injectable({ providedIn: 'root' })

export class CheckoutService implements OnInit {
  private readonly _navigationSvc = inject(NavigationService)
  private readonly _orderSvc = inject(OrdersService)
  private readonly _cartSvc = inject(CartService)
  private readonly route = inject(ActivatedRoute);
  order: IOrder | null = null;

  ngOnInit(): void {
    this.initializeOrderFromRoute()
  }

  private initializeOrderFromRoute() {
    this.order = this.route.snapshot.data['order']
  }

  getOrder() {
    return this.order
  }

  updateOrder(orderId: string, state?: string) {
    const order = this._orderSvc.findOrderById(orderId)
    if (order) {
      this._orderSvc.updateOrder(order, state)
    }
  }

  populateCartFromOrder(id: string): void {
    const order = this._orderSvc.findOrderById(id)
    if (order) {
      this._cartSvc.clearCart(false)
      order.items.forEach((item: IProduct) => {
        this._cartSvc.addToCart(item)
      })
    }
  }

  clearCartContents(notification: boolean) {
    this._cartSvc.clearCart(notification);
  }

  saveOrderAsPending() {
    const orderId = this.retrieveCurrentOrderId()
    if (orderId) {
      this.updateOrder(orderId)
      this.resetCurrentOrderId()
    } else {
      this._orderSvc.saveOrderAsPending()
      this._navigationSvc.navigateToOrders()
      this.removeOrderIfEmpty();
      this.resetCurrentOrderId()
    }
    this.clearCartContents(false)
  }

  finalizeOrder() {
    const orderId = this.retrieveCurrentOrderId()
    if (orderId) {
      const state = Status.CLOSED
      this.updateOrder(orderId, state)
      this.resetCurrentOrderId()
    } else {
      this.completeOrderProcessing();
      this.resetCurrentOrderId()
    }
    this.clearCartContents(false)
  }

  navigateToHomePage() {
    this._navigationSvc.navigateHome()
  }

  completeOrderProcessing(): any {
    this._orderSvc.closeOrder()
    this.removeOrderIfEmpty();
  }

  removeProductFromCart(id: number) {
    this._cartSvc.removeFromCart(id)
  }

  decrementProductQuantity(id: number): void {
    this._cartSvc.removeFromCart(id)
  }

  removeOrderIfCartIsEmpty(id: string) {
    const updatedOrder = this._orderSvc.findOrderById(id)
    if (updatedOrder) {
      this._orderSvc.updateOrder(updatedOrder)
    }
  }

  removeOrderIfEmpty() {
    if (this.order && this._cartSvc.products().length === 0) {
      this._orderSvc.removeOrderById(this.order.id);
    }
  }

  deleteOrderById(id: string) {
    this._orderSvc.removeOrderById(id)
  }

  retrieveCurrentOrderId(): string | undefined {
    return this._orderSvc.retrieveOrderId()
  }

  resetCurrentOrderId() {
    this._orderSvc.resetOrderId()
  }

  handleClearAllFromCart() {
    if (this.order) {
      this.deleteOrderById(this.order.id);
    }
    this.clearCartContents(true);
    this.resetCurrentOrderId();
  }

  getCartProducts() {
    return this._cartSvc.products();
  }

  getCartTotalAmount() {
    return this._cartSvc.totalAmount();
  }

  getCartProductsCount() {
    return this._cartSvc.productsCount();
  }
}
