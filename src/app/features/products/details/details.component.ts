import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, Input, OnInit, Signal, inject, input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { IProduct } from '@shared/models/products-interface';
import { GenerateRatingStarService } from '@shared/services/generateRatingStar/generateRatingStar.service';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe],
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
                  <span [innerHTML]="generateStarSVG(index)"></span>
                }
                <span class="ml-3 text-gray-600">{{product()?.rating?.count}} reviews</span>
              </span>
            </div>
            <p class="mt-6 mb-5 leading-relaxed">{{product()?.description | slice:0:50 }}</p>
            <div class="flex">
              <span class="text-2xl font-bold text-orange-500">{{product()?.price | currency:'BRL':'symbol'}}</span>
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
  @Input() product!: Signal<IProduct | undefined>
  starsArray: number[] = new Array(5).fill(0);
  productId = input<number>(0, { alias: 'id' })
  cartStore = inject(CartStore)
  private readonly _generateRatingStar = inject(GenerateRatingStarService);
  private readonly _productsSvc = inject(ProductsService)

  ngOnInit(): void {
    this.product = this._productsSvc.getProductsById(this.productId())
  }
  onAddToCart() {
    const productWithQty = { ...this.product(), qty: 1 };
    this.cartStore.addProductToCart(productWithQty as IProduct)
  }

  generateStarSVG(index: number): SafeHtml {
    const product = this.product();
    if (product) {
      const rate = product.rating.rate;
      return this._generateRatingStar.generateRatingStar(index, rate);
    }
    return '';
  }
}
