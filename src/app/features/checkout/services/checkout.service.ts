import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IOrder } from "@shared/models/orders-interface";
import { IProduct } from "@shared/models/products-interface";
import { CartStore } from "@shared/store/shopping-cart.store";
import { OrdersService } from "app/features/orders/services/orders.service";

@Injectable({ providedIn: 'root' })

export class CheckoutService {
  private readonly router = inject(Router)
  private readonly cartStore = inject(CartStore)
  private readonly _orderSvc = inject(OrdersService)

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
    this._orderSvc.onSaveHowPending()
    this.router.navigate(["/"])

  }
  onContinue() {
    this.router.navigate(["/"])
  }
  onProceedToPayService(): any {
    this._orderSvc.onCloseOrder()
  }

  removeItem(id: number) {
    this.cartStore.removeFromCart(id)
  }
  removeOneItemFromCart(id: number): void {
    this.cartStore.removeOneItemFromCart(id)
  }
}
