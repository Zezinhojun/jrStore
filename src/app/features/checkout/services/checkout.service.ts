import { Injectable } from "@angular/core";
import { IProduct } from "@shared/models/products.interface";

@Injectable({ providedIn: 'root' })

export class CheckoutService {
  onProceedToPay(cartStore:IProduct[]): any {
   }
}
