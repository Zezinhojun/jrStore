import { inject, Injectable, signal } from '@angular/core';
import { IOrder } from '@shared/models/orders-interface';
import { OrderStore } from '@shared/store/order.store';
import { Status } from '@shared/utils/order-status';
import { CartService } from './cart/cart.service';
import { NavigationService } from '@shared/services/navigation/navigation.service';
import GlobalErrorHandler from '@shared/services/globalErrorHandling/globalErrorHandler.service';

@Injectable({ providedIn: 'root' })

export class OrdersService {
  public orderId = signal<string>("")

  private readonly _cartSvc = inject(CartService)
  private readonly _navigationSvc = inject(NavigationService)
  private readonly orderStore = inject(OrderStore)
  private readonly _globalErrorHandler = inject(GlobalErrorHandler)

  clearFilter(): void {
    try {
      this.orderStore.clearFilter();
    } catch (error) {
      this._globalErrorHandler.handleError(error)
    }
  }

  findOrderById(id: string): IOrder | undefined {
    try {
      return this.orderStore.findOrderById(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
      return undefined
    }
  }

  filterOrdersByState(state: string): void {
    try {
      this.orderStore.filterOrdersByState(state);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  removeAllOrders(): void {
    try {
      this.orderStore.removeAllOrders();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  removeOrderById(id: string): void {
    try {
      this.orderStore.removeOrderById(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  closeOrder(): void {
    try {
      if (!this._cartSvc.hasProduct()) {
        console.log("Carrinho está vazio");
        return;
      }
      this.orderStore.addOrder(this._cartSvc.getProduct(), Status.CLOSED);
      this._cartSvc.clearCart(false);
      this.resetOrderId();
      this._navigationSvc.navigateToOrders();
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }
  }

  saveOrderAsPending(): void {
    try {
      if (this._cartSvc.hasProduct()) {
        this.orderStore.addOrder(this._cartSvc.getProduct(), Status.PENDING)
        this._cartSvc.clearCart(false)
        this.resetOrderId()
      }
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }

  }

  updateOrder(order: IOrder, state?: string): void {
    try {
      if (this._cartSvc.hasProduct()) {
        this.orderStore.updateOrder(order, this._cartSvc.getProduct(), state)
        this._cartSvc.clearCart(false)
        this.resetOrderId()
        this._navigationSvc.navigateToOrders()
      }
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }

  }

  storeOrderId(id: string): void {
    try {
      this.orderId.set(id)
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }

  }

  retrieveOrderId(): string | undefined {
    try {
      return this.orderId()
    } catch (error) {
      this._globalErrorHandler.handleError(error);
      return undefined
    }
  }

  resetOrderId(): void {
    try {
      this.orderId.set("")
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }

  }

  continueShopping(): void {
    try {
      this.resetOrderId()
      this._navigationSvc.navigateHome()
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }

  }

  goToCheckout(id: string): void {
    try {

      this._navigationSvc.navigateToCheckout(id);
    } catch (error) {
      this._globalErrorHandler.handleError(error);
    }

  }
}
