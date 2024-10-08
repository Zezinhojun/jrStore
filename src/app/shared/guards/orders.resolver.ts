import { inject } from '@angular/core';
import { Router, type ResolveFn } from '@angular/router';
import { IOrder } from '@shared/models/orders-interface';
import { CheckoutService } from 'app/features/checkout/services/checkout.service';
import { OrdersService } from 'app/features/orders/services/orders.service';
import { of } from 'rxjs';

export const ordersResolver: ResolveFn<IOrder | null> = (route) => {
  const _ordersSvc = inject(OrdersService);
  const _checkSvc = inject(CheckoutService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (id) {
    const order = _ordersSvc.getOrderById(id);
    if (order) {
      _checkSvc.populateCartFromOrder(order.id);
      return of(order);
    } else {
      router.navigate(['/orders']);
      return of(null);
    }
  } else {
    router.navigate(['/orders']);
    return of(null);
  }
};
