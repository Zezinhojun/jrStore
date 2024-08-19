import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import GlobalErrorHandler from '../globalErrorHandling/globalErrorHandler.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router)
  private _globalErrorHandlerSvc = inject(GlobalErrorHandler)

  async navigateToOrders() {
    try {
      await this.router.navigate(['/orders']);
    } catch (error) {
      this._globalErrorHandlerSvc.handleError(error)
    }
  }

  async navigateToCheckout(id: string) {
    try {
      await this.router.navigate(['/checkout', id]);
    } catch (error) {
      this._globalErrorHandlerSvc.handleError(error)
    }
  }

  async navigateHome() {
    try {
      await this.router.navigate(['/']);
    } catch (error) {
      this._globalErrorHandlerSvc.handleError(error)
    }

  }

}
