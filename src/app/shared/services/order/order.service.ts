import { inject, Injectable, signal } from '@angular/core';
import { OrderStore } from '@shared/store/order.store';
import GlobalErrorHandler from '../globalErrorHandling/globalErrorHandler.service';
import { IProduct } from '@shared/models/products-interface';
import { IOrder } from '@shared/models/orders-interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly OrderStore = inject(OrderStore);
  private readonly _globalErrorHandler = inject(GlobalErrorHandler);
  readonly ordersCount = signal(() => this.OrderStore.ordersCount())
  readonly totalAmount = signal(() => this.OrderStore.totalAmount())
  readonly orders = signal(() => this.OrderStore.orders())
  readonly filteredOrders = signal(() => this.OrderStore.filteredOrders())

  addOrder(items: IProduct[], state: string, id?: string): void {
    try {
      this.OrderStore.addOrder(items, state, id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  updateOrder(order: IOrder, items: IProduct[], state?: string): void {
    try {
      this.OrderStore.updateOrder(order, items, state);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  filterOrdersByState(state: string): void {
    try {
      this.OrderStore.filterOrdersByState(state);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  clearFilter(): void {
    try {
      this.OrderStore.clearFilter();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  removeAllOrders(): void {
    try {
      this.OrderStore.removeAllOrders();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  removeOrderById(id: string): void {
    try {
      this.OrderStore.removeOrderById(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  findOrderById(id: string): IOrder | undefined {
    try {
      return this.OrderStore.findOrderById(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
      return undefined;
    }
  }

  get FullState() {
    return {
      orders: this.orders(),
      totalAmount: this.totalAmount(),
      ordersCount: this.ordersCount(),
      filteredOrders: this.filteredOrders()
    }
  }
}
