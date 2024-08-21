import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { IProduct } from '@shared/models/products-interface';
import { CartService } from '@shared/services/cart/cart.service';
import { NavigationService } from '@shared/services/navigation/navigation.service';

import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
})
export default class ProductsComponent {
  private readonly _productSvc = inject(ProductsService);
  private readonly _cartSvc = inject(CartService);
  private readonly _navigationSvc = inject(NavigationService);
  public products = this._productSvc.products;
  public isDropdownOpen = signal<boolean>(false);
  public selectedSortOrder: 'asc' | 'desc' = 'desc';

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  updateSortOrder(order: 'asc' | 'desc') {
    this.selectedSortOrder = order;
    this.isDropdownOpen.set(false);
    this._productSvc.sortProducts(order);
  }

  onAddToCart(product: IProduct): void {
    this._cartSvc.addToCart(product);
  }

  buyNow() {
    const product = this._productSvc.getProductById(17);
    if (product) {
      const productWithQty = { ...product, qty: 1 };
      this.onAddToCart(productWithQty);
      this._navigationSvc.navigateToCheckoutWithoutId();
    }
  }
}
