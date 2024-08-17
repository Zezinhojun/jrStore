import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';
import { OrderStore } from '@shared/store/order.store';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Status } from '@shared/utils/order-status';

@Injectable({ providedIn: 'root' })

export class OrdersService {
  private readonly router = inject(Router)
  private readonly cartStore = inject(CartStore)
  private readonly orderStore = inject(OrderStore)
  private readonly products = this.cartStore.products

  clearFilter() {
    this.orderStore.clearFilter();
  }

  clearOrders() {
    this.orderStore.removeAllOrders()
  }

  getOrderById(id: string) {
    return this.orderStore.getOrderById(id)
  }

  filterOrderByState(state: string) {
    this.orderStore.filterOrderByState(state)
  }

  onContinueShopping(): any {
    this.router.navigate(["/"])
  }

  onCloseOrder(): any {
    try {
      if (this.products().length > 0) {
        this.orderStore.addOrder(this.cartStore.products(), Status.CLOSED)
        this.cartStore.clearCart(false)
        this.router.navigate(["/orders"])
      }
    } catch (error) {
      console.error(error);
    }
  }

  onGoToCheckout(id: string) {
    const order = this.orderStore.getOrderById(id);
    if (order) {
      this.router.navigate(['/checkout', id]);
    } else {
      console.error('Order not found');
    }
  }

  onSaveHowPending() {
    try {
      if (this.products().length > 0) {
        this.orderStore.addOrder(this.products(), Status.PENDING)
        this.cartStore.clearCart(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeOneOrder(id: string) {
    this.orderStore.removeOneOrderFromOrders(id)
  }

  updateOrder(order: IOrder, state?: string): void {
      if(this.products().length > 0){
        this.orderStore.updateOrder(order, this.products(), state)
        this.cartStore.clearCart(false)
        this.router.navigate(['/orders'])
      }
    }

   checkAndRemoveOrderIfEmpty(orderId: string) {
      const order = this.orderStore.orders().find(o => o.id === orderId);

      if (order && order.items.length === 0) {
          this.removeOneOrder(orderId);
      }
  }


}
