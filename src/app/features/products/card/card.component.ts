import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddToCartButtonComponent } from '@shared/components/add-to-cart-button.component';
import { RatingStarsComponent } from '@shared/components/rating-stars.component';
import { IProduct } from '@shared/models/products-interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink, RatingStarsComponent, AddToCartButtonComponent],
  template: `
<div class="group relative p-2 mt-8 overflow-hidden rounded-lg shadow-lg bg-gray-200 hover:shadow-xl h-120 flex flex-col">
  <button (click)="toggleHeart()"
          class="absolute top-2 right-2 z-20 p-2 bg-gray-200 rounded-full focus:outline-none">
    <img [src]="isHeartFilled ? '../../../assets/svgs/heart-filled.svg' : '../../../assets/svgs/heart.svg'"
         alt="Heart Icon" class="w-6 h-6" />
  </button>
  <a class="relative block h-3/4 overflow-hidden rounded" [routerLink]="['/products',(product.id)]">
    <div class="w-full h-full bg-gray-200 hover:opacity-75 rounded-md overflow-hidden">
      <img src="{{product.image}}"
           alt="{{product.title}}"
           class="w-full h-full  object-center transition duration-500 transform hover:scale-105" />
    </div>
  </a>
  <div class="mt-4 flex flex-col gap-2 flex-1">
    <div class="flex justify-between">
      <div>
        <h3 class="text-xs text-gray-700 font-bold">
          {{product.title}}
        </h3>
        <p class="mt-2 inline-block px-2 py-1 text-xs text-gray-500 bg-green-50 rounded-xl">
          {{product.category}}
        </p>
      </div>
      <p class="text-xl text-gray-900 font-bold">{{product.price | currency:'BRL':'symbol'}}</p>
    </div>
    <div class="flex mb-2">
    <app-rating-stars [ratingRate]="product.rating.rate" [ratingCount]="product.rating.count"></app-rating-stars>
    </div>
    <app-add-to-cart-button [product]="product" (addToCartEvent)="onAddToCart($event)"></app-add-to-cart-button>
  </div>
</div>
`
})
export class CardComponent {
  public isHeartFilled: boolean = false;
  @Output() addToCartEvent = new EventEmitter<IProduct>();
  @Input() product!: IProduct;


  onAddToCart(product: IProduct): void {
    this.addToCartEvent.emit(product);
  }

  toggleHeart(): void {
    this.isHeartFilled = !this.isHeartFilled;
  }
}
