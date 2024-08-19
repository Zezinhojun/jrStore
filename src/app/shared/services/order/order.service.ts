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

  updateOrderById(order: IOrder, items: IProduct[], state?: string): void {
    try {
      this.OrderStore.updateOrderById(order, items, state);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  filterOrdersByState(state: string): void {
    try {
      this.OrderStore.filterOrders(state);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  resetOrderFilter(): void {
    try {
      this.OrderStore.resetOrderFilter();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  deleteAllOrders(): void {
    try {
      this.OrderStore.deleteAllOrders();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  deleteOrderById(id: string): void {
    try {
      this.OrderStore.deleteOrderById(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  getOrderById(id: string): IOrder | undefined {
    try {
      return this.OrderStore.getOrderById(id);
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
