import { Routes } from '@angular/router';
import { ordersResolver } from '@shared/guards/orders.resolver';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/product.routes'),

  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component')
  },
  {
    path: 'checkout/:id',  // Rota com ID para carregar um pedido existente
    loadComponent: () => import('./features/checkout/checkout.component'),
    resolve: { order: ordersResolver }
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/orders.component')
  },

  { path: "", redirectTo: 'products', pathMatch: 'full' },
  { path: "**", redirectTo: 'products', pathMatch: 'full' },
];
