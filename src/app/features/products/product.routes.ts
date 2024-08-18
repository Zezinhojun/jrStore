import { Routes } from '@angular/router';
import { Routes as AppRoutes } from "./../../shared/utils/routes.enum"

const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('./products.component')
  },
  {
    path: ':id',
    loadComponent: () => import('./details/details.component')
  },
];

export default routes
