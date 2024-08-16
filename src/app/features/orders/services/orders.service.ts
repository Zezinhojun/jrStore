import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { IOrder } from "@shared/models/orders-interface";
import { OrderStore } from "@shared/store/order.store";
import { CartStore } from "@shared/store/shopping-cart.store";

@Injectable({ providedIn: 'root' })
export class OrdersService {
  public orders = signal<IOrder | null>(null);
  router = inject(Router)
  cartStore = inject(CartStore)
  orderStore = inject(OrderStore)


  onSaveHowPending(){
    console.log(this.cartStore.products());
    try {
      if (this.cartStore.products().length > 0) {
        this.orderStore.addOrder(this.cartStore.products(), "pending")
      }
      this.cartStore.clearCart()
      console.log(this.orderStore.orders());
      
    } catch (error) {
      console.log(error);

    }
  }

  onProceedToPayService(): any {
    console.log(this.cartStore.products());
    try {
      if (this.cartStore.products().length > 0) {
        this.orderStore.addOrder(this.cartStore.products(), "closed")
      }

      console.log(this.orderStore.orders());
      
    } catch (error) {
      console.log(error);

    }
  }
  onContinueShopping(): any {
    this.router.navigate(["/"])
  }
}
