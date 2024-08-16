import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { OrderStore } from '@shared/store/order.store';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export default class OrdersComponent {
  private readonly _ordersSvc = inject(OrdersService)
  public orderStore = inject(OrderStore)

  applyFilter(state: string) {
    this._ordersSvc.filterOrderByState(state);
  }


  clearFilter() {
    this._ordersSvc.clearFilter();
  }
  
  clearOrders() {
    this._ordersSvc.clearOrders()
  }
  
  onCloseOrder(): void {
    this._ordersSvc.onCloseOrder()
  }
  
  onContinue(): void {
    this._ordersSvc.onContinueShopping()
  }

  removeOneOrder(id:string){
    this._ordersSvc.removeOneOrder(id)
  }
}
