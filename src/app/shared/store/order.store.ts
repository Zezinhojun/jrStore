import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IOrder } from '@shared/models/orders-interface';
import { IOrderStore } from '@shared/models/orderStore-interface';
import { IProduct } from '@shared/models/products-interface';
import { Status } from '@shared/utils/order-status';
import { ToastMessage } from '@shared/utils/toast-message';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';

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
        ordersCount: computed(() => calculateTotalOrderCount(orders())),
        totalAmount: computed(() => calculateTotalAmount(orders())),
        filteredOrders: computed(() => filteredOrders())
    })),

    withMethods(({ orders, ...store }, _toastSvc = inject(ToastrService)) => ({

        addOrder: async (items: IProduct[], state: string) => {
            const id = uuidv4()
            const newOrder: IOrder = {
                id,
                state,
                items,
                totalAmount: calculateTotalAmountForOrder({ id, state, items, totalAmount: 0, ordersCount: 0 }),
                ordersCount: calculateOrderCountForOrder({ id, state, items, totalAmount: 0, ordersCount: 0 })
            }
            const updatedOrders = [...orders(), newOrder];
            patchState(store, { orders: updatedOrders, filteredOrders: updatedOrders } as Partial<IOrderStore>);
            _toastSvc.success(ToastMessage.ADD_ORDER)

        },
        filterOrderByState: async (state:string) => {
            state === Status.PENDING ? state = Status.PENDING : state = Status.CLOSED
            const filtered = orders().filter(order => order.state === state);
            patchState(store, { filteredOrders: filtered } as Partial<IOrderStore>)
        },

        clearFilter: async () => {
            patchState(store, { filteredOrders: orders() } as Partial<IOrderStore>); 
        },
        removeAllOrders() {
            patchState(store, { orders: [], filteredOrders: [] } as Partial<IOrderStore>);
            _toastSvc.info(ToastMessage.ORDERS_CLEAN)

        },

        removeOneOrderFromOrders(id: string) {
            const currentOrders = orders();
            const updatedOrders = currentOrders.filter(order => order.id !== id);
            patchState(store, { orders: updatedOrders, filteredOrders: updatedOrders } as Partial<IOrderStore>);
            _toastSvc.info(ToastMessage.REMOVE_ORDER);
          }
    }))

);

const calculateTotalAmountForOrder = (order: IOrder): number => {
    return parseFloat(order.items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
}

const calculateOrderCountForOrder = (order: IOrder): number => {
    return order.items.reduce((acc, item) => acc + item.qty, 0);
}

const calculateTotalAmount = (orders: IOrder[]): number => {
    return orders.reduce((acc, order) => acc + order.totalAmount, 0);
}

const calculateTotalOrderCount = (orders: IOrder[]): number => {
    return orders.reduce((acc, order) => acc + order.ordersCount, 0);
}