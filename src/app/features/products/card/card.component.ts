import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { IProduct } from '@shared/models/products-interface';
import { GenerateRatingStarService } from '@shared/services/generateRatingStar/generateRatingStar.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  template: `
<div class="group relative p-2 mt-8 overflow-hidden rounded-lg shadow-lg bg-gray-200 hover:shadow-xl h-96 flex flex-col">
  <button (click)="toggleHeart($event)"
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
        <p class="mt-2 inline-block px-2 py-1 text-xs text-gray-500 bg-purple-100 rounded-xl">
          {{product.category}}
        </p>
      </div>
      <p class="text-xl text-gray-900 font-bold">{{product.price | currency:'BRL':'symbol'}}</p>
    </div>
    <div class="flex mb-2">
      <span class="flex items-center">
        @for (item of starsArray; track index; let index = $index) {
          <span [innerHTML]="generateStarSVG(index)"></span>
        }
        <span class="text-xs ml-3 text-gray-600">{{product.rating.count}} reviews</span>
      </span>
    </div>
    <button (click)="onAddToCart()"
            class="w-32 text-sm py-2 px-4 rounded-full border border-black text-black bg-white hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
      Add to cart
    </button>
  </div>
</div>
`
})
export class CardComponent {
  private readonly _generateRatingStar = inject(GenerateRatingStarService);
  public readonly starsArray: number[] = new Array(5).fill(0);
  public isHeartFilled: boolean = false;
  @Output() addToCartEvent = new EventEmitter<IProduct>();
  @Input() product!: IProduct;


  onAddToCart(): void {
    const productWithQty = { ...this.product, qty: 1 };
    this.addToCartEvent.emit(productWithQty);
  }

  generateStarSVG(index: number): SafeHtml {
    const rate = this.product.rating.rate;
    return this._generateRatingStar.generateRatingStar(index, rate);
  }

  toggleHeart(event: Event): void {
    this.isHeartFilled = !this.isHeartFilled;
  }
}
