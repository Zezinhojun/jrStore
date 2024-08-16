import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CartStore } from "@shared/store/shopping-cart.store";
import { OrdersService } from "app/features/orders/services/orders.service";

@Injectable({ providedIn: 'root' })

export class CheckoutService {
  private readonly router = inject(Router)
  private readonly cartStore = inject(CartStore)
  private readonly _orderSvc = inject(OrdersService)

  onClearAllFromCart(){
    this.cartStore.clearCart(true)
  }
  onSaveHowPending(){
    this._orderSvc.onSaveHowPending()
    this.router.navigate(["/"])

  }
  onContinue() {
    this.router.navigate(["/"])
  }
  onProceedToPayService(): any {
    this._orderSvc.onCloseOrder()
  }

  removeItem(id: number){
    this.cartStore.removeFromCart(id)
  }
  removeOneItemFromCart(id: number): void {
    this.cartStore.removeOneItemFromCart(id)
  }
}
