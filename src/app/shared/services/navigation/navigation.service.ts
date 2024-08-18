import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private router = inject(Router)

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }

  navigateToCheckout(id: string): void {
    this.router.navigate(['/checkout', id]);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }


}
