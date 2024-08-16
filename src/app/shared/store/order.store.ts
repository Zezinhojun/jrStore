import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IOrder } from '@shared/models/orders-interface';
import { IOrderStore } from '@shared/models/orderStore-interface';
import { IProduct } from '@shared/models/products-interface';
import { ToastMessage } from '@shared/utils/toast-message';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

const initialState: IOrderStore = {
    orders: [],
    totalAmount: 0,
    ordersCount: 0
};

export const OrderStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ orders }) => ({
        ordersCount: computed(() => calculateTotalOrderCount(orders())),   
        totalAmount: computed(() => calculateTotalAmount(orders()))
    })),

    withMethods(({ orders, ...store }, _toastSvc = inject(ToastrService)) => ({

        addOrder:(items: IProduct[], state: string) =>{
            const id = uuidv4()
            const newOrder: IOrder = {
                id, 
                state, 
                items, 
                totalAmount: calculateTotalAmountForOrder({id, state,items, totalAmount:0, ordersCount:0}),
                ordersCount: calculateOrderCountForOrder({id, state, items, totalAmount:0, ordersCount: 0})
            }

            const updatedOrders = [...orders(), newOrder];
            patchState(store, { orders: updatedOrders });
            _toastSvc.success(ToastMessage.ADD_ITEM)

        },
        calculateOrderDetails: (order: IOrder) =>{
            order.totalAmount = calculateTotalAmountForOrder(order),
            order.ordersCount = calculateOrderCountForOrder(order)
        },
    }))

);


// Função para calcular o total de um pedido
const calculateTotalAmountForOrder = (order: IOrder): number => {
    return parseFloat(order.items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));}

// Função para calcular a contagem de itens em um pedido
const calculateOrderCountForOrder = (order: IOrder): number => {
    return order.items.reduce((acc, item) => acc + item.qty, 0);
}

// Função para calcular o total global de todos os pedidos
const calculateTotalAmount = (orders: IOrder[]): number => {
    return orders.reduce((acc, order) => acc + order.totalAmount, 0);
}

// Função para calcular a contagem total de itens em todos os pedidos
const calculateTotalOrderCount = (orders: IOrder[]): number => {
    return orders.reduce((acc, order) => acc + order.ordersCount, 0);
}