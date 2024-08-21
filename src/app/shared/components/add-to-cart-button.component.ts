import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '@shared/models/products-interface';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [],
  template: ` <button
    (click)="onAddToCart()"
    class="w-32 text-sm py-2 px-4 rounded-full border border-black text-black bg-slate-100 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
  >
    Add to cart
  </button>`,
})
export class AddToCartButtonComponent {
  @Input() product?: IProduct;
  @Output() addToCartEvent = new EventEmitter<IProduct>();

  onAddToCart(): void {
    if (this.product) {
      const productWithQty = { ...this.product, qty: 1 };
      this.addToCartEvent.emit(productWithQty);
    }
  }
}
