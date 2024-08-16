import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OrderStore } from "@shared/store/order.store";
import { CartStore } from "@shared/store/shopping-cart.store";
import { Status } from "@shared/utils/order-status";

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



}
