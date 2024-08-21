import { inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';
import { IProduct } from '@shared/models/products-interface';
import { NavigationService } from '@shared/services/navigation/navigation.service';
import { Status } from '@shared/utils/order-status';
import { CartService } from '@shared/services/cart/cart.service';
import { OrdersService } from 'app/features/orders/services/orders.service';

@Injectable({ providedIn: 'root' })
export class CheckoutService implements OnInit {
  private readonly _navigationSvc = inject(NavigationService);
  private readonly _ordersSvc = inject(OrdersService);
  private readonly _cartSvc = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  order: IOrder | null = null;

  ngOnInit(): void {
    this.initializeOrderFromRoute();
  }

  private initializeOrderFromRoute() {
    this.order = this.route.snapshot.data['order'];
  }

  getOrder() {
    return this.order;
  }

  updateOrder(orderId: string, state?: string) {
    const order = this._ordersSvc.getOrderById(orderId);
    if (order) {
      this._ordersSvc.updateOrderById(order, state);
    }
  }

  populateCartFromOrder(id: string): void {
    const order = this._ordersSvc.getOrderById(id);
    if (order) {
      this._cartSvc.clearCart(false);
      order.items.forEach((item: IProduct) => {
        this._cartSvc.addToCart(item);
      });
    }
  }

  clearCartContents(notification: boolean) {
    this._cartSvc.clearCart(notification);
  }

  saveOrderAsPending() {
    const orderId = this.retrieveCurrentOrderId();
    if (orderId) {
      this.updateOrder(orderId);
      this.resetCurrentOrderId();
    } else {
      this._ordersSvc.saveOrderAsPending();
      this._navigationSvc.navigateToOrders();
      this.resetCurrentOrderId();
    }
    this.clearCartContents(false);
  }

  finalizeOrder() {
    const orderId = this.retrieveCurrentOrderId();
    if (orderId) {
      const state = Status.CLOSED;
      this.updateOrder(orderId, state);
      this.resetCurrentOrderId();
    } else {
      this.completeOrderProcessing();
      this.resetCurrentOrderId();
    }
    this.clearCartContents(false);
  }

  navigateToHomePage() {
    this._navigationSvc.navigateHome();
  }

  completeOrderProcessing(): any {
    this._ordersSvc.closeOrder();
  }

  removeProductFromCart(id: number) {
    this._cartSvc.removeFromCart(id);
  }

  decrementProductQuantity(id: number): void {
    this._cartSvc.decrementProductQuantity(id);
  }

  removeOrderIfCartIsEmpty(id: string) {
    const updatedOrder = this._ordersSvc.getOrderById(id);
    if (updatedOrder) {
      this._ordersSvc.updateOrderById(updatedOrder);
    }
  }

  deleteOrderById(id: string) {
    this._ordersSvc.deleteOrderById(id);
  }

  retrieveCurrentOrderId(): string | undefined {
    return this._ordersSvc.retrieveOrderId();
  }

  resetCurrentOrderId() {
    this._ordersSvc.resetOrderId();
  }

  handleClearAllFromCart() {
    if (this.order) {
      this.deleteOrderById(this.order.id);
    }
    this.clearCartContents(true);
    this.resetCurrentOrderId();
  }

  addToCart(product: IProduct): void {
    const productWithQty = { ...product, qty: 1 };
    this._cartSvc.addToCart(productWithQty);
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
