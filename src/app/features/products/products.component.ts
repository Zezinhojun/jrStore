import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { IProduct } from '@shared/models/products-interface';
import { CartService } from '@shared/services/cart/cart.service';

import { CardComponent } from './card/card.component';
import { NavigationService } from '@shared/services/navigation/navigation.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  template: `
@defer(when products().length>0){
<div
  class="flex flex-col items-center lg:flex-row justify-between container mx-auto bg-opacity-70 bg-gray-200 p-12 mt-4">
  <div class="flex flex-col justify-start gap-20 mt-16 lg:mt-0 lg:w-1/2 hidden md:block">
    <h1 class="text-5xl text-gray-600 w-full lg:w-9/12 mb-10 ">Grab upto 50% off on select Rain Jacket</h1>
    <button (click)="buyNow()"
      class="w-40 px-4 py-3 rounded-2xl bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-opacity-50">
      Buy now
    </button>
  </div>
  <div class="hidden lg:flex lg:justify-center lg:items-center lg:w-1/2">
    <img src="./../../../assets/img/rainJacke.png" alt=""
      class="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 object-contain" />
  </div>
  <div class="lg:hidden flex flex-col items-center gap-4">
    <img src="./../../../assets/img/rainJacke.png" alt=""
      class="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 object-contain" />
    <button (click)="buyNow()"
      class="w-40 px-4 py-3 rounded-2xl bg-green-800 text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-opacity-50">
      Buy now
    </button>
  </div>
</div>
<div class="flex container mx-auto mb-6 justify-end mt-6">
  <div>
    <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Sort by</label>
    <div class="relative mt-2">
      <button type="button"
        class=" relative w-[200px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        aria-haspopup="listbox" [attr.aria-expanded]="isDropdownOpen()" aria-labelledby="listbox-label"
        (click)="toggleDropdown()">
        <span class="flex items-center">
          <span class="ml-3 block truncate">Sort: {{ selectedSortOrder === 'asc' ? 'Ascending' : 'Descending' }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
      @if(isDropdownOpen()){
      <ul
        class="absolute z-10 mt-1 max-h-56 w-full min-w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1" role="listbox" aria-labelledby="listbox-label">
        <li
          class="relative cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-green-100 flex items-center justify-between"
          role="option" (click)="updateSortOrder('asc')">
          <div class="flex items-center">
            <span class="ml-3 block truncate">Ascending</span>
          </div>
          @if(selectedSortOrder === "asc"){
          <span class="flex items-center text-indigo-600">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd" />
            </svg>
          </span>
          }
        </li>
        <li
          class="relative cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-green-100 flex items-center justify-between"
          role="option" (click)="updateSortOrder('desc')">
          <div class="flex items-center">
            <span class="ml-3 block truncate">Descending</span>
          </div>
          @if(selectedSortOrder == "desc"){
          <span class="flex items-center text-indigo-600">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd" />
            </svg>
          </span>
          }
        </li>
      </ul>
      }
    </div>
  </div>
</div>
<section class="text-gray-600 body-font">
  <div class="container px-5 mx-auto">
    <h1 class="ml-10 font-bold text-3xl">All products in SALE</h1>
    <div class="flex flex-wrap -m-4">
      @for (product of products(); track $index) {
      <app-card class="w-full p-4 lg:w-1/4 md:w-1/2" [product]="product" (addToCartEvent)="onAddToCart($event)">
      </app-card>
      }
    </div>
  </div>
</section>
}
`
})
export default class ProductsComponent {
  private readonly _productSvc = inject(ProductsService)
  private readonly _cartSvc = inject(CartService);
  private readonly _navigationSvc = inject(NavigationService)
  public products = this._productSvc.products
  public isDropdownOpen = signal<boolean>(false);
  public selectedSortOrder: 'asc' | 'desc' = 'desc';
  private product!: IProduct

  toggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen())
  }

  updateSortOrder(order: 'asc' | 'desc') {
    this.selectedSortOrder = order;
    this.isDropdownOpen.set(false);
    this._productSvc.sortProducts(order);
  }

  onAddToCart(product: IProduct): void {
    console.log(product)
    this._cartSvc.addToCart(product)
  }

  buyNow() {
    const product = this._productSvc.getProductById(17);
    if (product) {
      const productWithQty = { ...product, qty: 1 };
      this._cartSvc.addToCart(productWithQty);
      this._navigationSvc.navigateToCheckoutWithoutId();
    }
  }

}
