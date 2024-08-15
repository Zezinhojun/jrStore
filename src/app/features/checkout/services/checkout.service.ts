import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IProduct } from "@shared/models/products-interface";
import { OrdersService } from "app/features/orders/services/orders.service";

@Injectable({ providedIn: 'root' })

export class CheckoutService {
  router = inject(Router)
  private readonly _orderSvc = inject(OrdersService)
  orders = this._orderSvc.orders
  
  onContinue() {
    this.router.navigate(["/"])
  }
  onProceedToPay(cartStore: IProduct[]): any {

  }
}
