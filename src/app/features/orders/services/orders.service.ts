import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { IProduct } from "@shared/models/products-interface";

@Injectable({ providedIn: 'root' })

export class OrdersService {
  public orders = signal<IProduct[]>([]);
  router = inject(Router)

  onProceedToPay(cartStore: IProduct[]): any {
    this.orders.set(cartStore)
    this.router.navigate(["/checkout"])
  }
  onContinueShopping(): any {
    this.router.navigate(["/"])
  }
}
