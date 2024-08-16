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

  constructor() {
    this.order = this.route.snapshot.data['order'];
    this.checkAndRemoveOrder();
  }

  updateOrder(order:IOrder, state?: string){
    this._orderSvc.updateOrder(order, state)
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

   onClearAllFromCart () {
     this.cartStore.clearCart(true)
     this.checkAndRemoveOrder();
  }

   onSaveHowPending() {
     this._orderSvc.onSaveHowPending()
    this.router.navigate(["/"])
    this.checkAndRemoveOrder();

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

  private checkAndRemoveOrder() {
    if (this.order && this.cartStore.products().length === 0) {
      this._orderSvc.removeOneOrder(this.order.id);
    }
  }

}
