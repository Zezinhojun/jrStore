import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';
import { IProduct } from '@shared/models/products-interface';
import { OrdersService } from './services/orders.service';
import { OrderStore } from '@shared/store/order.store';

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
  orderStore = inject(OrderStore)
  

  constructor(){
    console.log(this.orderStore.orders())
  }
  onProceedToPay(): void {
    this._ordersSvc.onProceedToPayService()
  }
  onContinue(): void {
    this._ordersSvc.onContinueShopping()
  }

  removeItem(id: string): void {
  }

  removeOneItem(id: number): void {
    this.cartStore.removeOneItemFromCart(id)
  }

  clearAll(): void {
    this.cartStore.clearCart()
  }
}
