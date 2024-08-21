import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IOrder } from '@shared/models/orders-interface';
import { IOrderStore } from '@shared/models/orderStore-interface';
import { IProduct } from '@shared/models/products-interface';
import { Status } from '@shared/utils/order-status';
import { ToastMessage } from '@shared/utils/toast-message';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';

import * as orderUtils from '../utils/order-utils';

const initialState: IOrderStore = {
  orders: [],
  totalAmount: 0,
  ordersCount: 0,
  filteredOrders: [],
};

export const OrderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ orders, filteredOrders }) => ({
    ordersCount: computed(() => orderUtils.calculateTotalOrderCount(orders())),
    totalAmount: computed(() => orderUtils.calculateTotalAmount(orders())),
    filteredOrders: computed(() => filteredOrders()),
  })),

  withMethods(({ orders, ...store }, _toastSvc = inject(ToastrService)) => ({
    updateOrderById(order: IOrder, items: IProduct[], state?: string) {
      const status = state ?? Status.PENDING;
      const existingOrder = orders().find((o) => o.id === order.id);
      if (existingOrder) {
        existingOrder.items = items;
        existingOrder.state = status;
        existingOrder.totalAmount =
          orderUtils.calculateTotalAmountForOrder(existingOrder);
        existingOrder.ordersCount =
          orderUtils.calculateOrderCountForOrder(existingOrder);

        if (existingOrder.ordersCount <= 0) {
          this.deleteOrderById(order.id);
          _toastSvc.info(ToastMessage.REMOVE_ORDER);
        } else {
          const updatedOrders = orders().map((o) =>
            o.id === order.id ? existingOrder : o,
          );
          patchState(store, {
            orders: updatedOrders,
            filteredOrders: updatedOrders,
          } as Partial<IOrderStore>);
        }
      }
    },

    addOrder: (items: IProduct[], state: string, id?: string): void => {
      const orderid = id ?? uuidv4();
      const newOrder: IOrder = {
        id: orderid,
        state,
        items,
        totalAmount: orderUtils.calculateTotalAmountForOrder({
          id: orderid,
          state,
          items,
          totalAmount: 0,
          ordersCount: 0,
        }),
        ordersCount: orderUtils.calculateOrderCountForOrder({
          id: orderid,
          state,
          items,
          totalAmount: 0,
          ordersCount: 0,
        }),
      };

      const updatedOrders = [...orders(), newOrder];
      patchState(store, {
        orders: updatedOrders,
        filteredOrders: updatedOrders,
      } as Partial<IOrderStore>);
      _toastSvc.success(ToastMessage.ADD_ORDER);
    },

    filterOrders: (state: string): void => {
      if (state === Status.PENDING) {
        state = Status.PENDING;
      } else {
        state = Status.CLOSED;
      }
      const filtered = orders().filter((order) => order.state === state);
      patchState(store, { filteredOrders: filtered } as Partial<IOrderStore>);
    },

    resetOrderFilter: (): void => {
      patchState(store, { filteredOrders: orders() } as Partial<IOrderStore>);
    },

    deleteAllOrders: (): void => {
      patchState(store, {
        orders: [],
        filteredOrders: [],
      } as Partial<IOrderStore>);
      _toastSvc.info(ToastMessage.ORDERS_CLEAN);
    },

    deleteOrderById(id: string) {
      const currentOrders = orders();
      const updatedOrders = currentOrders.filter((order) => order.id !== id);
      patchState(store, {
        orders: updatedOrders,
        filteredOrders: updatedOrders,
      } as Partial<IOrderStore>);
      _toastSvc.info(ToastMessage.REMOVE_ORDER);
    },

    getOrderById: (id: string): IOrder | undefined => {
      const currentOrder = orders();
      return currentOrder.find((order) => order.id === id);
    },
  })),
);
