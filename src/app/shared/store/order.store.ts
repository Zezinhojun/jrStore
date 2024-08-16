import { computed, effect, inject } from '@angular/core';
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

      updateOrder(order: IOrder, items: IProduct[], state?: string) {
        const status = state ?? Status.PENDING
        const existingOrder = orders().find(o => o.id === order.id);

        if (existingOrder) {
              existingOrder.items = items;
              existingOrder.state = status;
              existingOrder.totalAmount = calculateTotalAmountForOrder(existingOrder);
              existingOrder.ordersCount = calculateOrderCountForOrder(existingOrder);

              if(existingOrder.ordersCount <= 0){
                this.removeOneOrderFromOrders(order.id)
                console.log("Removido com sucesso")
                _toastSvc.info(ToastMessage.REMOVE_ORDER);
              } else{
                console.log("Não removeu nada")
                const updatedOrders = orders().map(o => o.id === order.id ? existingOrder : o);
                patchState(store, { orders: updatedOrders, filteredOrders: updatedOrders } as Partial<IOrderStore>);
              }
      }
    },


        addOrder : async function (items: IProduct[], state: string, id?:string) {
            const orderid = id ?? uuidv4()
            const newOrder: IOrder = {
                id: orderid,
                state,
                items,
                totalAmount: calculateTotalAmountForOrder({ id: orderid, state, items, totalAmount: 0, ordersCount: 0 }),
                ordersCount: calculateOrderCountForOrder({ id: orderid, state, items, totalAmount: 0, ordersCount: 0 })
            }

              const updatedOrders = [...orders(), newOrder];
              patchState(store, { orders: updatedOrders, filteredOrders: updatedOrders } as Partial<IOrderStore>);
              _toastSvc.success(ToastMessage.ADD_ORDER)


        },
        filterOrderByState: async (state:string) => {
          if (state === Status.PENDING) {
            state = Status.PENDING;
        } else {
            state = Status.CLOSED;
        }            const filtered = orders().filter(order => order.state === state);
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
          },

        getOrderById(id: string){
            const currentOrder = orders()
            return currentOrder.find(order => order.id === id)
        }
    })),
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
