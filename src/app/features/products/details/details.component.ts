import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { IProduct } from '@shared/models/products.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <section class="overflow-hidden text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap mx-auto lg:w-4/5">
          <img
            src="{{product()?.image}}"
            alt="{{product()?.title}}"
            class="object-cover object-center w-full h64 rounded lg:w-1/2 lg:h-auto">
          <div class="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
            <h2 class="text-sm tracking-widest text-gray-500 title-font">{{product()?.category}}</h2>
            <h1 class="mb-1 text-3xl font-medium text-gray-900 title-font">{{product()?.title}}</h1>
            <div class="flex mb-4">
              <span class="flex items-center">
                @for (item of starsArray; track index; let index = $index) {
                  <span [innerHTML]="generateSVG(index)"></span>
                }
                <span class="ml-3 text-gray-600">{{product()?.rating?.count}} reviews</span>
              </span>
            </div>
            <p class="mt-6 mb-5 leading-relaxed">{{product()?.description}}</p>
            <div class="flex">
              <span class="text-2xl font-bold text-orange-500">{{product()?.price | currency}}</span>
              <button (click)="onAddToCart()"
                      class=" ml-auto px-2 py-1 text-white bg-orange-500 rounded hover:bg-orange-700">
          Add to cart
        </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export default class DetailsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);

  // @Input({ alias: 'id' }) productId!: number
  productId = input<number>(0, { alias: 'id' })
  product!: Signal<IProduct | undefined>
  cartStore = inject(CartStore)

  private readonly _productsSvc = inject(ProductsService)
  private readonly _sanitizer = inject(DomSanitizer)

  ngOnInit(): void {
    this.product = this._productsSvc.getProductsById(this.productId())
  }
  onAddToCart() {
    const productWithQty = { ...this.product(), qty: 1 };
    this.cartStore.addToCart(productWithQty as IProduct)
  }

  generateSVG(index: number): SafeHtml {
    let svgContent = null
    const rate = this.product()?.rating.rate as number
    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    } else if (index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    }
    return this._sanitizer.bypassSecurityTrustHtml(svgContent)
  }
}
