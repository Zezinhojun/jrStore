import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';
import { IProduct } from '@shared/models/products-interface';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export default class OrdersComponent {
  private readonly _ordersSvc = inject(OrdersService)
  public cartStore = inject(CartStore)

  onProceedToPay(cartStore: IProduct[]): void {
    this._ordersSvc.onProceedToPay(cartStore)
  }
  onContinue(): void {
    this._ordersSvc.onContinueShopping()
  }

  removeItem(id: number): void {
    this.cartStore.removeFromCart(id)
  }

  removeOneItem(id: number): void {
    this.cartStore.removeOneItemFromCart(id)
  }

  clearAll(): void {
    this.cartStore.clearCart()
  }
}
