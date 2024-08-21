import { Routes } from '@angular/router';
import { Routes as AppRoutes } from './shared/utils/routes.enum';
import { ordersResolver } from '@shared/guards/orders.resolver';

export const routes: Routes = [
  {
    path: AppRoutes.PRODUCTS,
    loadChildren: () => import('./features/products/product.routes'),
  },
  {
    path: AppRoutes.CHECKOUT,
    loadComponent: () => import('./features/checkout/checkout.component'),
  },
  {
    path: AppRoutes.CHECKOUT_WITH_ID,
    loadComponent: () => import('./features/checkout/checkout.component'),
    resolve: { order: ordersResolver },
  },
  {
    path: AppRoutes.ORDERS,
    loadComponent: () => import('./features/orders/orders.component'),
  },

  { path: AppRoutes.HOME, redirectTo: AppRoutes.PRODUCTS, pathMatch: 'full' },
  { path: '**', redirectTo: AppRoutes.PRODUCTS, pathMatch: 'full' },
];
